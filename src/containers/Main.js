import React, { Component } from 'react';
import UserForm from '../components/UserForm';
import { login, createNewUser, getAllUsers } from '../utils/AjaxHelpers';

export default class Main extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('react_auth_token') || '';
    const loggedIn = token ? true : false;
    const statusMessage = loggedIn ? "Resuming prior session" : "";
    const username = token ? localStorage.getItem('react_auth_uid') : "";

    this.state = {
      loggedIn,
      username,
      statusMessage,
      token,
      password: '',
      failedLogIns: 0
    };

    this.bind([
      'updateState',
      'login',
      'logout',
      'currentlyLoggedIn',
      'updateState',
      'register'
    ]);
  }

  bind(methods) {
    methods.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  updateState(key, val) {
    // const priorState = Object.assign({}, this.state);
    // so we can revert if necessary
    this.setState({
      [key]: val
    });
  }

  login(e) {
    e.preventDefault();
    if (this.currentlyLoggedIn()) {
      //const priorState = Object.assign({}, this.state);
      this.setState({
        statusMessage: `You're currently logged in as ${this.state.username}. Please log out if you wish to log in as a different user.`
      });
    } else {
      if (this.state.username && this.state.password) {
        login(this.state.username, this.state.password)
          .then(response => {
            return response.json();
          }).then(json => {
            if (json.token !== null && !json.error) {
              // const priorState = Object.assign({}, this.state);
              this.setState({
                token: json.token,
                loggedIn: true,
                statusMessage: `Congrats ${this.state.username}! You are logged in.`
              });
              localStorage.setItem("react_auth_token", json.token);
              localStorage.setItem('react_auth_uid', this.state.username);
            } else {
              // const priorState = Object.assign({}, this.state);
              const failedLogIns = ++this.state.failedLogIns;
              this.setState({
                loggedIn: false,
                statusMessage: json.error,
                failedLogIns
              });
            }
          });
      } else {
        // const priorState = Object.assign({}, this.state);
        const failedLogIns = ++this.state.failedLogIns
        this.setState({
          statusMessage: "Please provide both a username and a password to log in.",
          failedLogIns,
          loggedIn: false
        });
      }
    }
  }

  register(e) {
    e.preventDefault();
    if (!this.currentlyLoggedIn()) {

    }
  }

  logout(e) {
    e.preventDefault();
    if (this.currentlyLoggedIn()) {
      const priorState = Object.assign({}, this.state);
      this.setState({
        token: "",
        loggedIn: false,
        username: "",
        statusMessage: `${priorState.username}, you have logged out of the app.`
      });
      localStorage.removeItem("react_auth_token");
      localStorage.removeItem("react_auth_uid");
    }
  }

  currentlyLoggedIn() {
    return (this.state.loggedIn || localStorage.getItem('react_auth_token'))
  }

  render() {

    return (
      <div>
        <UserForm loggedIn={this.state.loggedIn}
                  token={this.state.token}
                  handleUpdateState={this.updateState}
                  handleLogin={this.login}
                  handleLogout={this.logout}
                  statusMessage={this.state.statusMessage}
                  username={this.state.username}
                  failedLogIns={this.state.failedLogIns} />
      </div>
    );
  }
}
