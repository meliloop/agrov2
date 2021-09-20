import axios from 'axios';

const instance = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: `${typeof firebase !== 'undefined' ? firebase.config().wordpress.url : process.env.REACT_APP_WORDPRESS_URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default instance;