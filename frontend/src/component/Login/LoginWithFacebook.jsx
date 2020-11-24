import React, { useContext, useEffect } from "react"
import FacebookLogin from "react-facebook-login"
import { storesContext } from "../../context"

export default function LoginWithFacebook(props) {
  const { userStore } = useContext(storesContext)

  const responseFacebook = async (response) => {
    if (response) {
      console.log(response)
      await userStore.setUser(response)
      props.handleClose()
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
