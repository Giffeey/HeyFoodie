import React, { useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import OrderAlert from "../component/OrderConfirm/OrderAlert"
import orderService from "../services/order.service"
import dayjs from "dayjs"
import Accordion from "react-bootstrap/Accordion"
import { useAccordionToggle } from "react-bootstrap/AccordionToggle"

export default function QueuePage() {
  const [order, setOrder] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const fetchOrder = async () => {
    const response = await orderService.findByCustomerId(1)
    console.log(response.data)
    setOrder(response.data)
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <>
      <OrderAlert></OrderAlert>
      {order.map((item) => (
        <div className="card">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h5>Order ID : {item.order_id}</h5>
                <div className="progress">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p>Status : {item.order_status}</p>
                <p>Date : {dayjs(item.date).format("DD/MM/YYYY h:m:s")}</p>
                <div className="col-3 col-6">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      รายละเอียดคำสั่งซื้อ
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <p>
                        <ul>
                          <div className="p-2">Flex item 1</div>
                          <div className="p-2">Flex item 2</div>
                          <div className="p-2">Flex item 3</div>
                        </ul>
                      </p>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

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
    </>
  )
}
