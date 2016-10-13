import React, { Component } from 'react';
import UserForm from '../components/UserForm';
import AjaxHelpers from '../utils/AjaxHelpers';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      token: '',
      failedLogIns: 0,
      statusMessage: ''
    };

    this.bind([
      'updateState',
      'login',
      'currentlyLoggedIn'
    ]);
  }

  bind(methods) {
    methods.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  updateState(key, val) {
    // const oldState = Object.assign({}, this.state);
    // so we can revert if necessary
    this.setState({
      [key]: val
    });
  }

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
        });
    }
  }

  currentlyLoggedIn() {
    return (this.state.loggedIn && localStorage.getItem('token'))
  }

  render() {
    return (
      <div>
        <UserForm loggedIn={this.state.loggedIn}
                  token={this.state.token}
                  handleUpdateState={this.updateState}
                  handleLogin={this.login}
                  statusMessage={this.state.statusMessage}
                  username={this.state.username}
                  failedLogIns={this.state.failedLogIns} />
      </div>
    );
  }
}
