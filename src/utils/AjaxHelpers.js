const domain = process.env.NODE_ENV === "production" ? 'https://test-authentication-backend.herokuapp.com' : 'http://localhost:3333';

const request = (URL, method, body = "") => {
  return fetch(URL, {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    mode: 'cors',
    body
  });
};
const login = (username, password) => {
  const URL = domain + "/users/login";
  const user = JSON.stringify({
    username,
    password
  });

  return request(URL, 'POST', user);
};

const createNewUser = (username, password) => {
  const URL = domain + '/users/new';
  const newUser = JSON.stringify({
    username,
    password,
    isTeacher: true,
    isAdmin: false
  });

  return request(URL, 'POST', newUser);
};

const getAllUsers = () => {
  const URL = domain + '/users/all';
  const token = JSON.stringify({
    token: localStorage.getItem('token')
  });
  if (!token.token) {
    throw new Error('whoops') //TODO FIXME obviously
  } else {
    return request(URL, 'GET', token);
  }
};

export { login, createNewUser, getAllUsers }
