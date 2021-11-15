import api from './api';

export const signUp = (body) => {
  return api.post('/authentication/sign-up', body).then((response) => {
    const data = response.data;
    const user = data.user;
    return user;
  });
};

/*
GET | listAllHabits(category) | takes ‘habit category’ as an argument and lists all habits of that category

GET | listMyHabits() | lists all habits of registered user

POST | addHabit(user._id, {habit._id, settings}) | takes habit ID as an argument and adds this habit to own calendar so that it can be tracked (maybe adds it to a personal data base where properties of habit can be changed?)

POST/DELETE | removeHabit(habit._id) | takes habit ID as an argument and removes this habit from own calendar so that it is no longer tracked

POST? | sendReminder(habit._id) | takes habit ID as an argument and sends reminder about this habit to user (at pre-defined time and frequency)

POST | updateHabit(habit._id, {settings}) | takes habit ID and data object (with data that should be changed) as an arguments and updates this habit in personal data base (user can adapt properties of habit to personal needs)

POST | habitCompletion(habit._id) | takes habit ID and data object (with timestamp) as arguments, looks for userId in habit.user.userID and adds data to habit.user.data

POST | checkStreak(habit._id) |  takes habit ID as argument, looks for userId in habit.user.userID, checks last streak in the data log habit.user.data and updates habit.user.streak accordingly
*/

export const listAllHabits = (category) => {
  api.get(`/category/${category}/list`).then((response) => {
    return response.data.habits;
  });
};

export const listHabitDetail = (habitId) => {
  api.get(`/category/:category/detail/${habitId}`).then((response) => {
    return response.data.habit;
  });
};

export const listMyHabits = (userId) => {
  api.get(`/user/${userId}/habits`).then((response) => {
    return response.data.myHabits;
  });
};

export const addHabit = (userId, { habitId, settings }) => {};

export const removeHabit = (habitId) => {};

export const sendReminder = (habitId) => {};

export const updateHabit = (habitId, { settings }) => {};

export const habitCompletion = (habitId) => {};

export const checkStreak = (habitId) => {};
