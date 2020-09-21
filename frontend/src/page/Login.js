import React from "react";
import FormLogin from "../component/Login/FormLogin";
import CommonCard from "../component/Common/CommonCard";
import FacebookLogin from "react-facebook-login";
import fbLogin from "../component/Login/fbLogin";
import GoogleLogin from "react-google-login";
import ggLogin from "../component/Login/ggLogin";


export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(event.target.password.value);
  }

  // const fbResponse = (response) => {
  //   console.log(response);
  // }

  const responseFacebook = async (response) => {
    let fbResponse = await fbLogin(response.accessToken)
    console.log(fbResponse);
    console.log(response)
  }

  const responseGoogle = async(response) => {
    let googleResponse  = await ggLogin(response.accessToken)
    console.log(googleResponse);
    console.log(response);
    console.log('response login')
  }

  return (
    <div className="container min-vh-100 max-vw">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <CommonCard className="mx-auto">
            {/* <FormLogin handleSubmit={handleSubmit}></FormLogin> */}
            <div className="Facebook">
              <FacebookLogin
                textButton="Login With Facebook"
                appId="319223145838224"
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </div>
          </CommonCard>
        </div>
        <div className="col-3"></div>
        <div className="col-6">
          <CommonCard className="mx-auto">
            <div className="Google">
              <GoogleLogin
                clientId="460267343315-e1hai5hpkjunjjgf6gh9hibevn9ag4hq.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
          </CommonCard>
        </div>
      </div>
    </div>
  );
}
