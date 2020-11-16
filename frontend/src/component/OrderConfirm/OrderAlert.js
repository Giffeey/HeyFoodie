import React from "react"


export default function OrderAlert() {

  return (
    <div className="alert alert-success" role="alert">
      <p>
        {" "}
        <strong>Thank you!</strong> Your order was confirmed.
      
      <button
        className="close ml-auto"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      </p>
    </div>
  )
}
