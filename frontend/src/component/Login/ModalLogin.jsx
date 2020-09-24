import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import user from "../../img/icon/user.png"
import LoginWithFacebook from "./LoginWithFacebook"
import LoginWithGoogle from "./LoginWithGoogle"
import GoogleBtn from "./googleBtn"

export default function ModalTest(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      {props.userStore.user.first_name ?
        <label className="white">{props.userStore.user.first_name}</label>
        :
        <a className="navbar-link" onClick={handleShow}>
          <img className="nav-user" src={user} alt="img-user"></img>
    Login
      </a>
      }


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto justify">
          <LoginWithFacebook {...props}></LoginWithFacebook>
          {/* <LoginWithGoogle></LoginWithGoogle> */}
          <br></br>
          <GoogleBtn></GoogleBtn>
        </Modal.Body>
      </Modal>
    </>
  )
}
