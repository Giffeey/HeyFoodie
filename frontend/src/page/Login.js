import React from "react";
import FormLogin from "../component/Login/FormLogin";
import CommonCard from "../component/Common/CommonCard";
import FacebookLogin from "react-facebook-login"


export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(event.target.password.value);
  }

  const fbResponse = (response) => {
    console.log(response);
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
                callback={fbResponse}
              />
            </div>
          </CommonCard>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
