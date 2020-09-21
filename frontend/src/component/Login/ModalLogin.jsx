import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import user from "../../img/icon/user.png"
import LoginWithFacebook from "./LoginWithFacebook"
import LoginWithGoogle from "./LoginWithGoogle"

export default function ModalTest() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <a className="navbar-link" onClick={handleShow}>
        <img className="nav-user" src={user} alt="img-user"></img>
        Login
      </a>

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
          <LoginWithFacebook></LoginWithFacebook>
          <br></br>
          <LoginWithGoogle></LoginWithGoogle>
        </Modal.Body>
      </Modal>
    </>
  )
}
