const updateState = (key, val) => {
  // const oldState = Object.assign({}, this.state);
  // so we can revert if necessary
  this.setState({
    [key]: val
  });
};

const logout = () => {
  const oldUsername = this.state.username;
  localStorage.removeItem('react_auth_uid');
  localStorage.removeItem('react_auth_token');
  this.setState({
    token: '',
    loggedIn: false,
    username: '',
    statusMessage: `${oldUsername}, you've been logged out of the app.`
  });
};

export { updateState, logout }
