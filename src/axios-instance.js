import axios from 'axios';

const instance = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: `${firebase.config().wordpress.url}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default instance;