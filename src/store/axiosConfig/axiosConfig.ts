import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = `token ${process.env.REACT_APP_GITHUB_USER_TOKEN}`;
// axios.defaults.withCredentials = true;

export default axios;
