import React from 'react';


const UserOutput = (props) => {
	const style = {
		color: 'green',
		fontSize: 20
	}
	return (
		<div>
			<p style={style}>By: {props.username}</p>
			<p>Meis adipisci mei ex, ad pro choro solet mediocrem, mel mandamus sadipscing ex. Accusata delicatissimi an mei, ludus consulatu per at. Eu mei summo possit suscipit, idque decore vim ex. Ne wisi brute labores qui, te impedit splendide qui. Erat reque ius no. Minim adversarium quo no, ei hinc eloquentiam eum, sit feugiat antiopam at.</p>
			<p>Lorem ipsum dolor sit amet, id odio summo quo, homero oporteat sit ut, vidit justo intellegam eos ex. Ne eam vitae veritus verterem. Sit stet hinc explicari ex. Assentior consequuntur ei mea. Errem consequat interesset ut mel, sed ne quando saperet scribentur. Perfecto legendos pericula vim id. Ex est elaboraret philosophia, eu odio etiam salutandi duo. </p>
		</div>
	)
}

export default UserOutput;