'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('./../models/user');
const Habit = require('./../models/Habit');

//GET | listMyHabits() | lists all habits of registered user
router.get('/user/:userId/overview', (req, res, next) => {
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

//POST | addHabit(user._id, {habit._id, settings}) | takes habit ID as an argument and adds this habit to own calendar so that it can be tracked (maybe adds it to a personal data base where properties of habit can be changed?)
router.post('/user/:userId/habits/add', (req, res, next) => {
  const { userId } = req.params;
  const habit = req.body.habit;
  console.log('habit!!', req.body.startDate);
  const habitData = {
    name: habit.name,
    category: [...habit.category],
    tags: [...habit.tags],
    interval: habit.interval
  };

  //add user with settings to habit.users

  Habit.create({
    userId,
    ...habitData,
    startDate: req.body.startDate,
    unit: req.body.unit,
    quantity: req.body.quantity
  })
    .then((newHabit) => {
      console.log('NEW HABIT WAS CREATED.', newHabit);

      //add habit to list of habits that user tracks (user.habits)})
      return User.findByIdAndUpdate(
        userId,
        { $push: { habits: newHabit._id } },
        { new: true }
      );
    })
    .then((user) => {
      console.log('NEW HABIT WAS ADDED TO EXISTING USER.');
      res.json({ user });
    })
    .catch((error) => {
      console.log('THERE WAS AN ERROR CREATING A NEW HABIT.');
      console.log(error);
      next(error);
    });
});

//---------- FUNCTIONALITY OF ALL OF THE FOLLOWING HAS _N_O_T_ YET BEEN TESTED ----------

//POST/DELETE | removeHabit(habit._id) | takes habit ID as an argument and removes this habit from own calendar so that it is no longer tracked
router.post('/user/:userId/habits/:habitId/remove', (req, res, next) => {
  const { userId, habitId } = req.params;
  //remove user from habit.users
  let user;
  User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        habits: { habitId }
      }
    },
    { new: true }
  )
    //remove habit from list of habits that user tracks (user.habits)
    .then((doc) => {
      user = doc;
      return Habit.findByIdAndDelete(habitId);
    })
    .then(() => {
      res.json(user.habits);
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
  const { habitId } = req.params;

  Habit.findByIdAndUpdate(habitId, { $push: { data: Date.now() } })
    .then(() => {
      console.log('ADDING NEW TIMESTAMP SUCCESSFUL.');
      res.json({ habitId });
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
