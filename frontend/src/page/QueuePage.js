import React, { useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import OrderAlert from "../component/OrderConfirm/OrderAlert"


export default function QueuePage() {
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  

  return (
    <>
      <OrderAlert></OrderAlert>
      <CommonCard>
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
    </>
  )
}
