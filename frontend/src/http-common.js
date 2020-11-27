import axios from 'axios';

export default axios.create({
    baseURL: "https://heyfoodie.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});