import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import user from "../../img/icon/user.png"
import LoginWithFacebook from "./LoginWithFacebook"
import GoogleBtn from "./googleBtn"

export default function ModalTest(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      {props.userStore.user !== undefined ?
        <a className="navbar-link" onClick={handleShow}>
          <label className="white"> {props.userStore.user.first_name} {props.userStore.user.last_name}</label>
        </a>
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
          {props.userStore.user !== undefined ?
            <Modal.Title></Modal.Title>
            :

            <Modal.Title>Login</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body className="mx-auto justify">
          {props.userStore.user !== null ?
            <>
              <center>
                {/* <img src={props.userStore.user.picture.data.url}></img> */}
                <h3> {props.userStore.user.first_name} {props.userStore.user.last_name} </h3>

                {props.userStore.user.email}
              </center>

              <br />
              <Button onClick={props.userStore.signOut}>Logout</Button>
            </>
            :
            <>

              {/* <LoginWithFacebook 
                userStore = {props.userStore}{...props}></LoginWithFacebook> */}
              {/* <LoginWithGoogle></LoginWithGoogle> */}
              <br></br>
              <GoogleBtn></GoogleBtn>
            </>
          }

        </Modal.Body>
      </Modal>
    </>
  )
}
