import React, { useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import OrderAlert from "../component/OrderConfirm/OrderAlert"
import orderService from "../services/order.service"
import orderDataService from "../services/orderDetail.service"
import dayjs from "dayjs"
import Accordion from "react-bootstrap/Accordion"
import { useAccordionToggle } from "react-bootstrap/AccordionToggle"
import { storesContext } from "../context"

export default function QueuePage() {
  const [order, setOrder] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { cartStore, userStore } = useContext(storesContext)
  const status = [
    { key: "CANCEL", value: "0" },
    { key: "WAITING", value: "25" },
    { key: "COOKING", value: "50" },
    { key: "READYTOPICKUP", value: "100" },
    { key: "DONE", value: "100" },
  ]
  const fetchOrder = async () => {
    const responseOrder = await orderService.findByCustomerId(
      userStore.customer?.id
    )
    const responseOrderDetail = await orderDataService.getAll()
    const data = responseOrder.data.map((order) => {
      const orderDetails = responseOrderDetail.data.filter(
        (detail) => detail.order.order_id == order.order_id
      )
      return { ...order, orderDetails }
    })
    setOrder(data)
  }

  const filterStatus = (itemStatus) => {
    const result = status.filter((item) => item.key === itemStatus)
    return result[0].value
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <>
      {order.length != 0 ? (
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
                        className={`progress-bar w-${filterStatus(
                          item.order_status
                        )}`}
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p>Status : {item.order_status}</p>
                    <p>
                      Date : {dayjs(item.date).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                    <div className="col-3 col-6">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          รายละเอียดคำสั่งซื้อ
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <p>
                            <ul>
                              {item.orderDetails?.map((orderDetail) => (
                                <div className="d-flex justify-content-between">
                                  <div className="p-2">
                                    {orderDetail.menu.name}&nbsp; (
                                    {orderDetail.size.size})
                                  </div>
                                  <div className="p-2">
                                    x {orderDetail.quantity}
                                  </div>
                                  <div className="p-2">
                                    {orderDetail.size.price}฿
                                  </div>
                                </div>
                              ))}
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
        </>
      ) : (
        <>
          <div className="card">
            <div className="row justify-content-center">
              <div className="col-3 p-0 text-center">
                คุณไม่มีคำสั่งซื้อในขณะนี้
              </div>
            </div>
          </div>
        </>
      )}
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
