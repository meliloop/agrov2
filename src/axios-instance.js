import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_WORDPRESS_URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default instance;