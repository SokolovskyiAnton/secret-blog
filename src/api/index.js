import axios from 'axios';

const api = axios.create({
    baseURL: "http://test-blog-api.ficuslife.com/api/v1"
});

export default api;