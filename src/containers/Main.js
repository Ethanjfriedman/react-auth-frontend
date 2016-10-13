import React, { Component } from 'react';
import UserForm from '../components/UserForm';
import AjaxHelpers from '../utils/AjaxHelpers';
import { updateState, logout } from '../utils/UserFxns';

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
      // 'updateState',
      'login',
      'logout',
      'currentlyLoggedIn',
      'handleUpdateState'
    ]);
  }

  bind(methods) {
    methods.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  handleUpdateState() {
    return updateState.bind(this);
  }

  handleLogout() {
    return logout.bind(this);
  }

  // updateState(key, val) {
  //   // const oldState = Object.assign({}, this.state);
  //   // so we can revert if necessary
  //   this.setState({
  //     [key]: val
  //   });
  // }

  login(e) {
    e.preventDefault();
    if (this.currentlyLoggedIn()) {
      //const oldState = Object.assign({}, this.state);
      this.setState({
        statusMessage: `You're currently logged in as ${this.state.username}. Please log out if you wish to log in as a different user.`
      });
    } else {
      AjaxHelpers.login(this.state.username, this.state.password)
        .then(response => {
          return response.json();
        }).then(json => {
          console.log(json);
          if (json.token !== null && !json.error) {
            // const oldState = Object.assign({}, this.state);
            this.setState({
              token: json.token,
              loggedIn: true,
              statusMessage: `Congrats ${this.state.username}! You are logged in.`
            });
            localStorage.setItem("react_auth_token", json.token);
            localStorage.setItem('react_auth_uid', this.state.username);
          } else {
            // const oldState = Object.assign({}, this.state);
            this.setState({
              loggedIn: false,
              statusMessage: json.error
            })
          }
        });
    }
  }

  logout(e) {
    e.preventDefault();
    if (this.currentlyLoggedIn()) {
      // const oldState = Object.assign({}, this.state);
      this.setState({
        token: "",
        loggedIn: false
      });
      localStorage.removeItem("token");
    }
  }

  currentlyLoggedIn() {
    return (this.state.loggedIn && localStorage.getItem('react_auth_token'))
  }

  render() {

    return (
      <div>
        <UserForm loggedIn={this.state.loggedIn}
                  token={this.state.token}
                  handleUpdateState={this.handleUpdateState}
                  handleLogin={this.login}
                  handleLogout={this.handleLogout}
                  statusMessage={this.state.statusMessage}
                  username={this.state.username}
                  failedLogIns={this.state.failedLogIns} />
      </div>
    );
  }
}
