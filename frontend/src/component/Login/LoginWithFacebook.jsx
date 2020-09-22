import React from 'react'
import FacebookLogin from "react-facebook-login"
import fbLogin from "./fbLogin"

export default function LoginWithFacebook() {
  function handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.email.value)
    console.log(event.target.password.value)
  }

  const responseFacebook = async (response) => {
    let fbResponse = await fbLogin(response.accessToken)
    console.log(fbResponse);
    console.log(response)
  }

  // const fbResponse = (response) => {
  //   console.log(response)
  // }

  return (
    <div>
      <div className="Facebook">
        <FacebookLogin
          textButton="Login with Facebook"
          appId="319223145838224"
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          scope="public_profile,email"
        />
      </div>
    </div>
  )
}
