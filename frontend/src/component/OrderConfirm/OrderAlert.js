import React from "react"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { useState } from "react"

export default function OrderAlert() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Alert show={show} variant="success">
        <strong>Thank You!</strong> Your order was confirmed.
        <Button
          className="close"
          onClick={() => setShow(false)}
          variant="outline-success"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </Button>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  )
}
