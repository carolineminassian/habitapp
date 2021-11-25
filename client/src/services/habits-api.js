import api from './api';

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

export const listMyHabits = (userId) => {
  return api.get(`/user/${userId}/overview`).then((response) => {
    return response.data.myHabits;
  });
};

export const addHabit = (data) => {
  const userId = data.userId;
  return api.post(`/user/${userId}/habits/add`, data).then((response) => {
    return response.data;
  });
};

export const removeHabit = (userId, habitId) => {
  return api.post(`/user/${userId}/habits/${habitId}/remove`);
};

export const sendReminder = (habitId) => {};

export const updateHabit = (habitId, { settings }) => {};

export const habitCompletion = (userId, habitId) => {
  return api.post(`/user/${userId}/habits/${habitId}/done`).then((response) => {
    return response.data.habitId;
  });
};

export const checkStreak = (habitId) => {};
