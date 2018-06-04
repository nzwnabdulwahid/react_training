import React from 'react';
import './UserInput.css'

const UserInput = (props) => {
	return (

		<label>
          Name:
          <input type="text" onChange={props.changeHandler} value={props.usernameVal}/>
        </label>

	)
}

export default UserInput;