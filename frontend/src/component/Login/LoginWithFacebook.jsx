import React, { useContext, useEffect } from 'react'
import {FacebookLogin, FacebookLogout} from "react-facebook-login"
import { FacebookProvider, Status } from 'react-facebook';
import { storesContext } from '../../context';


export default function LoginWithFacebook(props) {
  const { userStore } = useContext(storesContext)

  const responseFacebook = async (response) => {
    if (response) {
      userStore.setUser(response)
      console.log(userStore.user.email)
    }
  }

    return (
  
          <FacebookLogin
          textButton="Login with Facebook"
          appId="319223145838224"
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          />
   
  )
}
