import React, { useContext, useEffect } from 'react'
import FacebookLogin from "react-facebook-login"
import { FacebookProvider, Status } from 'react-facebook';
import { storesContext } from '../../context';


export default function LoginWithFacebook(props) {
  const { userStore } = useContext(storesContext)

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.email.value)
    console.log(event.target.password.value)
  }

  const responseFacebook = async (response) => {
    if (response) {
      userStore.setUser(response)
      console.log(userStore.user.email)
    }
  }


  return (
    <div>
      <div className="Facebook">
        <FacebookLogin
          textButton="Login with Facebook"
          appId="319223145838224"
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </div>
    </div>
  )
}
