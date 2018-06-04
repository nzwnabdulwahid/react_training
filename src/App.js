import React, { Component } from 'react';



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
      <div>
        
      </div>
    );
  }
}

export default App;
