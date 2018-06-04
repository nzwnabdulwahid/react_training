import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput'
import UserOutput from './UserOutput'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {username: "meow"};
  }

  usernameChangeHandle = (event) => {
    this.setState({
      username: event.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <UserInput usernameVal={this.state.username} changeHandler={this.usernameChangeHandle}/>
        <UserOutput username={this.state.username}/>
        <UserOutput username={this.state.username}/>
      </div>
    );
  }
}

export default App;
