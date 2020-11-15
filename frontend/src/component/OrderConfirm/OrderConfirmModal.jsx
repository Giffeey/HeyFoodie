import React from "react"
import Modal from "react-bootstrap/Modal"
import { useState } from "react"
import Button from "react-bootstrap/Button"

export default function OrderConfirmModal() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>Thank you!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Your order has been confirmed.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>OK</Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  )
}
