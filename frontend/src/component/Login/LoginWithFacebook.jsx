import React from 'react'
import FacebookLogin from "react-facebook-login"

export default function LoginWithFacebook() {
    function handleSubmit(event) {
        event.preventDefault()
        console.log(event.target.email.value)
        console.log(event.target.password.value)
      }
    
      const fbResponse = (response) => {
        console.log(response)
      }

    return (
        <div>
            <div className="Facebook">
              <FacebookLogin
                textButton="Login With Facebook"
                appId="319223145838224"
                fields="name,email,picture"
                callback={fbResponse}
              />
              </div>
        </div>
    )
}
