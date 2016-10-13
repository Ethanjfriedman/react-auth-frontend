import React, { Component } from 'react';
import Logout from './Logout.js';
import Login from './Login.js';

export default class UserForm extends Component {
  render() {
    const content = this.props.loggedIn ?
      <Logout token={this.props.token}
              onLogout={this.props.handleLogout}
              username={this.props.username} /> :
      <Login failedLogIns={this.props.failedLogIns}
             onLogin={this.props.handleLogin}
             onUpdateState={this.props.handleUpdateState} />;

    return (
      <form>
        <h3>{this.props.statusMessage}</h3>
        {content}
      </form>
    );
  }
}

UserForm.defaultProps = {
  loggedIn: false,
  username: '',
  token: '',
  failedLogIns: 0
};

UserForm.PropTypes = {
  failedLogIns: React.PropTypes.num,
  loggedIn: React.PropTypes.bool.isRequired,
  handleLogin: React.PropTypes.func.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  handleUpdateState: React.PropTypes.func.isRequired,
  username: React.PropTypes.string,
  token: React.PropTypes.string
};
