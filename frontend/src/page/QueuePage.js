import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import OrderConfirmModal from "../component/OrderConfirm/OrderConfirmModal"


export default function QueuePage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <CommonCard>
      {/* <OrderConfirmModal></OrderConfirmModal> */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h5>Order ID : </h5>
            <div className="progress">
              <div
                className="progress-bar w-75"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <br />
            <div className="col-3 col-6">
              <a className="a-form" onClick={() => setShowForm(true)}>
                {" "}
                รายละเอียดคำสั่งซื้อ{" "}
              </a>
              {showForm === true ? (
                <>
                  <div className="d-flex flex-column">
                    <ul>
                      <div className="p-2">Flex item 1</div>
                      <div className="p-2">Flex item 2</div>
                      <div className="p-2">Flex item 3</div>
                    </ul>
                  </div>
                  <br />
                  <a className="a-form" onClick={() => setShowForm(false)}>
                    {" "}
                    ^{" "}
                  </a>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 p-0 text-center">
          <Button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            ย้อนกลับ
          </Button>
        </div>
      </div>
    </CommonCard>
  )
}
