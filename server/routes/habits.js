'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('./../models/user');
const Habit = require('./../models/Habit');
const Data = require('./../models/Data');

//GET | listAllHabits(category) | takes ‘habit category’ as an argument and lists all habits of that category
router.get('/category/:category/list', (req, res, next) => {
  const { category } = req.params;
  Habit.find({ category: category })
    .then((habits) => {
      res.json({ habits });
    })
    .catch((error) => {
      next(error);
    });
});

//GET | listHabitDetail(habit._id) | takes ‘habit id as an argument and shows all details of that habit. allows user to add it to personal list
router.get('/category/:category/detail/:habitId', (req, res, next) => {
  const { habitId } = req.params;
  Habit.findById(habitId)
    .then((habit) => {
      res.json({ habit });
    })
    .catch((error) => {
      next(error);
    });
});

//GET | listMyHabits() | lists all habits of registered user
router.get('/user/:userId/habits', (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate('habits')
    .then((user) => {
      const myHabits = user.habits;
      res.json({ myHabits });
    })
    .catch((error) => {
      next(error);
    });
});

//---------- FUNCTIONALITY OF ALL OF THE FOLLOWING HAS _N_O_T_ YET BEEN TESTED ----------
//POST | addHabit(user._id, {habit._id, settings}) | takes habit ID as an argument and adds this habit to own calendar so that it can be tracked (maybe adds it to a personal data base where properties of habit can be changed?)
router.post('/user/:userId/habits/:habitId/add', (req, res, next) => {
  const { userId, habitId } = req.params;
  //const { settings, startingDate, additionalTags } = req.body;
  const { quantity, unit, startDate } = req.body.settings;
  //add user with settings to habit.users
  Data.create({})
    .then((response) => {
      return Habit.findByIdAndUpdate(
        habitId,
        {
          $push: {
            users: {
              $each: [
                {
                  userId,
                  startDate,
                  settings: { quantity, unit },
                  data: response._id
                }
              ]
            }
          }
        },
        { new: true }
      );
    })
    //add habit to list of habits that user tracks (user.habits)})

    .then(() => {
      console.log('NEW USER WAS ADDED TO HABIT LIST.');

      return User.findByIdAndUpdate(
        userId,
        { $push: { habits: habitId } },
        { new: true }
      );
    })
    .then((user) => {
      console.log('NEW HABIT WAS ADDED TO USER.');

      res.json({ user });
    })
    .catch((error) => {
      console.log('THERE WAS AN ERROR ADDING THE USER TO HABIT LIST.');
      console.log(error);
      next(error);
    });
});

//POST/DELETE | removeHabit(habit._id) | takes habit ID as an argument and removes this habit from own calendar so that it is no longer tracked
router.post('/user/:userId/habits/:habitId/remove', (req, res, next) => {
  const { userId, habitId } = req.params;
  //remove user from habit.users
  Habit.findByIdAndUpdate(
    habitId,
    {
      $pull: {
        users: { userId }
      }
    },
    { new: true }
  )
    //remove habit from list of habits that user tracks (user.habits)
    .then(() => {
      return User.findByIdAndUpdate(
        userId,
        { $pull: { habits: habitId } },
        { new: true }
      );
    })
    .then((user) => {
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

//POST? | sendReminder(habit._id) | takes habit ID as an argument and sends reminder about this habit to user (at pre-defined time and frequency)
router.post('', (req, res, next) => {});

//POST | updateHabit(habit._id, {settings}) | takes habit ID and data object (with data that should be changed) as an arguments and updates this habit in personal data base (user can adapt properties of habit to personal needs)
router.post('/user/:userId/habits/:habitId/update', (req, res, next) => {});

//POST | habitCompletion(habit._id) | takes habit ID and data object (with timestamp) as arguments, looks for userId in habit.user.userID and adds data to habit.user.data
router.post('/user/:userId/habits/:habitId/done', (req, res, next) => {
  const { userId, habitId } = req.params;

  Habit.findById(habitId)
    .populate('user.data')
    .then((habit) => {
      return habit.user.find({ userId });
    })
    .then((user) => {
      user.data.push(Date.now());
    })
    .catch((error) => {
      next(error);
    });
});

//POST | checkStreak(habit._id) |  takes habit ID as argument, looks for userId in habit.user.userID, checks last streak in the data log habit.user.data and updates habit.user.streak accordingly
router.post('/user/:userId/habits/:habitId/streak', (req, res, next) => {
  const { userId, habitId } = req.params;
});

module.exports = router;
