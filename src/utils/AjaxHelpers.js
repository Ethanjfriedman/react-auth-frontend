const domain = process.env.AUTH_TEST_BACKEND || "http://localhost:3333"

export default {
  request(URL, method, body = "") {
    return fetch(URL, {
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

    return this.request(URL, 'POST', user);
  },

  createNewUser(username, password) {
    const URL = domain + '/users/new';
    const newUser = JSON.stringify({
      username,
      password
    });

    return this.request(URL, 'POST', newUser);
  },

  getAllUsers() {
    const URL = domain + '/users/all';
    const token = JSON.stringify({
      token: localStorage.getItem('token')
    });
    if (!token.token) {
      throw new Error('whoops') //TODO FIXME obviously
    } else {
      return this.request(URL, 'GET', token);
    }
  }
}
