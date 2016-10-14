import React, { Component } from 'react';
import Button from './Button';

class Login extends Component {

  render() {
    return (
      <div>
        <h5>Log In to the App!</h5>
        <input type="text"
               onChange={e => this.props.onUpdateState('username', e.target.value)}
               placeholder="(Username)">
        </input>
        <input type="password"
               onChange={e => this.props.onUpdateState('password', e.target.value)}
               placeholder="(Password)">
        </input>
        <Button btnTxt="Login" btnAction={this.props.onLogin} />
        <Button btnTxt="Register" btnAction={this.props.onRegister} />
      </div>
    );
  }
}

Login.PropTypes = {
  onUpdateState: React.PropTypes.func.isRequired,
  onRegister: React.PropTypes.func.isRequired,
  onLogin: React.PropTypes.func.isRequired,
  failedLogIns: React.PropTypes.num
};

Login.defaultProps = {
  failedLogIns: 0
}

export default Login
