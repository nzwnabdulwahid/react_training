import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-ecb91.firebaseio.com/'
})

export default instance;