import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import user from "../../img/icon/user.png"
import LoginWithFacebook from "./LoginWithFacebook"
import { navigate } from "@reach/router"

export default function ModalTest(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      {props.userStore.user ? (
        <a className="navbar-link" onClick={handleShow}>
          {props.userStore.user.first_name} {props.userStore.user.last_name}
        </a>
      ) : (
        <a className="navbar-link" onClick={handleShow}>
          <img className="nav-user" src={user} alt="img-user"></img>
          Login
        </a>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {props.userStore.user ? (
            <Modal.Title>
              Hello! {props.userStore.user.first_name}{" "}
              {props.userStore.user.last_name}{" "}
            </Modal.Title>
          ) : (
            <Modal.Title>Login</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body className="row justify">
          {props.userStore.user ? (
            <>
              <div className="col-12 center">
                <p>คุณสามารถดูสถานะคำสั่งซื้อได้ที่</p>
                <h6>
                  <a
                    href="#"
                    onClick={() => navigate("/queuepage")}
                    className="tooltip-test"
                    title="StatusOrder"
                  >
                    Status Order
                  </a>
                </h6>
                <p>คุณสามารถดูประวัติการซื้อย้อนหลังได้ที่</p>
                <h6>
                  <a
                    href="#"
                    onClick={() => navigate("/historypage")}
                    className="tooltip-test"
                    title="History"
                  >
                    History
                  </a>
                </h6>
              </div>
              <Modal.Footer className="col-3 ml-auto">
                <Button onClick={() => props.userStore.signOut()}>
                  Logout
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <div>
              <LoginWithFacebook {...props} handleClose={handleClose} />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
