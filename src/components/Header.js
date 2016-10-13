import React, { Component } from 'react';

//TODO make this component reusable with different headers for
//different pages by rendering this.props.headerContent inside the h1
export default class Header extends Component {
  render() {
    return (
      <header>
        <h1>Simple React auth example</h1>
      </header>
    );
  }
}
