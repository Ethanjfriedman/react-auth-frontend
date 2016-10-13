import React, { Component } from 'react';
import Button from './Button';

export default class Logout extends Component {
  render() {
    return (
      <div>
        <h5>Log out of the App:</h5>
        <Button btnTxt="Log Out" btnAction={this.props.onLogout} />
      </div>
    );
  }
}
