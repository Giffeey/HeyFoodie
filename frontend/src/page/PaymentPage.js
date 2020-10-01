import React from "react"
import CommonPayment from "../component/Payment/CommonPayment"

export default function Cart() {
  return (
    <div className="container min-vh-100" style={{ width: "1080px" }}>
      <div className="row">
        <div className="col-12">
          <CommonPayment></CommonPayment>
        </div>
      </div>
    </div>
  )
}
