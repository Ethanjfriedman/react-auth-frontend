import React, { Component } from 'react';
import '../styles/css/App.css';
import Header from '../components/Header';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          The purpose of this app is just to demo out a React frontend + Node/Express/Passport backend for logging users (aka 'teachers') in securely.
        </p>
        <p className='App-intro'>The Github repo for this project can be found <a href='https://github.com/Ethanjfriedman/react-auth-frontend'>here.</a></p>
        <p className='App-intro'>The repo for the backend can be found <a href='https://github.com/Ethanjfriedman/express-auth-backend'>here.</a></p>
        <Main />
    </div>
    );
  }
}
