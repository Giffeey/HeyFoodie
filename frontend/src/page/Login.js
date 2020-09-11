import React from "react";
import FormLogin from "../component/Login/FormLogin";
import CommonCard from "../component/Common/CommonCard";


export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(event.target.password.value);
  }

  return (
    <div className="container min-vh-100 max-vw">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <CommonCard header="Login">
            <FormLogin handleSubmit={handleSubmit}></FormLogin>
          </CommonCard>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
