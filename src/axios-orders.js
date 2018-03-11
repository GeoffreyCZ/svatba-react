import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://svatba-react.firebaseio.com/'
});

export default instance;