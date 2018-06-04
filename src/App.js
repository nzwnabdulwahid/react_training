import React, { Component } from 'react';
import './App.css';


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
        <p>test</p>
      </div>
    );
  }
}

export default App;
