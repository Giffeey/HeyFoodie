import React, { useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import OrderAlert from "../component/OrderConfirm/OrderAlert"
import orderService from "../services/order.service"
import dayjs from "dayjs"

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

  // const showProverBody = useMemo(
  //   () => (
  //       {showCart.length != 0 ? (
  //         <>
  //         <OrderAlert></OrderAlert>
  //         <div className="container">
  //         <div className="row">
  //           <div className="col-12">
  //             <h5>Order ID : </h5>
  //             <div className="progress">
  //               <div
  //                 className="progress-bar w-75"
  //                 role="progressbar"
  //                 aria-valuenow="75"
  //                 aria-valuemin="0"
  //                 aria-valuemax="100"
  //               ></div>
  //             </div>
  //             <br />
  //             <div className="col-3 col-6">
  //               <a className="a-form" onClick={() => setShowForm(true)}>
  //                 {" "}
  //                 รายละเอียดคำสั่งซื้อ{" "}
  //               </a>
  //               {showForm === true ? (
  //                 <>
  //                   <div className="d-flex flex-column">
  //                     <ul>
  //                       <div className="p-2">Flex item 1</div>
  //                       <div className="p-2">Flex item 2</div>
  //                       <div className="p-2">Flex item 3</div>
  //                     </ul>
  //                   </div>
  //                   <br />
  //                   <a className="a-form" onClick={() => setShowForm(false)}>
  //                     {" "}
  //                     ^{" "}
  //                   </a>
  //                 </>
  //               ) : (
  //                 ""
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //         </>
  //       ) : (
  //         "คุณไม่มีคำสั่งซื้อในขณะนี้"
  //       )}
  //   ),
  // )

  return (
    <>
      <OrderAlert></OrderAlert>
      <CommonCard>
        <div className="container">
          {order.map((item) => (
            <div className="row">
              <div className="col-12">
                <h5>Order ID : {item.order_id}</h5>
                <div className="progress">
                  <div
                    className="progress-bar w-75"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p>Status : {item.order_status}</p>
                <p>Date : {dayjs(item.date).format("DD/MM/YYYY h:m:s")}</p>
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
          ))}
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
