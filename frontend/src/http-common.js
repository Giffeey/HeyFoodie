import axios from 'axios';

export default axios.create({
    baseURL: "/api/hfapi",
    headers: {
        "Content-type": "application/json",
    }
});