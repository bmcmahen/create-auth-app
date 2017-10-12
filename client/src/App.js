import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      current: null,
    };
  }

  async componentWillMount() {
    const { data } = await axios.get('/api/current_user');
    this.setState({ current: data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <a href="/auth/reddit">Log in with reddit.</a>
        </p>
      </div>
    );
  }
}

export default App;
