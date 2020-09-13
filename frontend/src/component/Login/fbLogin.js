import axios from "axios"

const fbLogin = async (accesstoken) => {
    let res = await axios.post(
        "http://localhost:8000/rest-auth/facebook/",
        {
            accesstoken: accesstoken,
        }
    );
    
    console.log(res);
    return await res.status;
};
export default fbLogin;