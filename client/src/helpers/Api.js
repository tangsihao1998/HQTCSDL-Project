import axios from 'axios';

export const api = axios.create ({
    baseURL: 'http://localhost:4000/api/',
    timeout: 1000,
});

// export const setAuthToken = (token) => {
//     if(token) {
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     else {
//         delete api.defaults.headers.common['Authorization'];
//     }
// }

// setAuthToken;