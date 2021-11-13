import api from './api';

export const signUp = (body) => {
  return api.post('/SignUp', body).then((response) => {
    const data = response.data;
    const user = data.user;
    return user;
  });
};

export const signIn = (body) =>
  api.post('/SignIn', body).then((response) => response.data.user);
