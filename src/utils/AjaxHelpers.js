const domain = process.env.AUTH_TEST_BACKEND || "http://localhost:3333"

export default {
  post(URL, body) {
    return fetch(URL,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      mode: 'cors',
      body
    });
  },

  login(username, password) {
    const URL = domain + "/users/login";
    const user = JSON.stringify({
      username,
      password
    });

    return this.post(URL, user); 
  },

  createNewUser(username, password) {
    const URL = domain + '/users/new';
    const newUser = JSON.stringify({
      username,
      password
    });

    return fetch(URL, {
      method: 'POST',
      body: newUser
    });
  },

  getAllUsers(token) {
    //TODO
  }
}
