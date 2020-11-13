import React, { useContext, useState } from "react"
import CommonCard from "../Common/CommonCard"
import Button from "react-bootstrap/Button"
import CheckoutList from "../CheckoutList"
import CreditPaymentForm from "./CreditPaymentForm"
import { storesContext } from "../../context"
import { Form } from "react-bootstrap"
// import CreditPaymentSubmit from "./CreditPaymentSubmit"

export default function CommonPayment(props) {
  const { cartStore, userStore } = useContext(storesContext)
  const [showForm, setShowForm] = useState(false)
  // const handleShowForm = (boolean) => {
  //     setShowForm(boolean)
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   if (showForm) {
  //     const card = {
  //       name: e.target.holder_name.value,
  //       number: e.target.card_no.value,
  //       expiration_month: e.target.expiration_month.value,
  //       expiration_year: e.target.expiration_year.value,
  //       security_code: e.target.security_code.value,
  //     }
  //     console.log(response)
  //   }
  //   const orderMenu = cartStore.currentCart
  // }

  return (
    <>
      <CommonCard>
        {/* <Form onSubmit={handleSubmit} id="checkout"> */}
          <h5 className="">รายการสั่งซื้อ</h5>
          {cartStore.currentCart.length >= 1 ? (
            <div>
              <div>
                {console.log(cartStore.currentCart)}
                {cartStore.currentCart.map((menu, index) => (
                  <CheckoutList key={index} menu={menu} />
                ))}
              </div>
              <p className="d-flex justify-content-end p-2 bd-highlight">
                รวม :{" "}
                {cartStore.currentCart.length != 0 &&
                  cartStore.currentCart
                    .map((item) => item.price * item.quantity)
                    .reduce((totalPrice, price) => price + totalPrice)}{" "}
                .00 ฿
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="noItem">ไม่มีสินค้าในตะกร้าของคุณ</div>
            </div>
          )}
          <div>
            <h5 className="">วิธีการชำระเงิน</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                defaultChecked
                onClick={() => setShowForm(false)}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                เงินสด (Cash)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
                disabled
                onClick={() => setShowForm(true)}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                บัตรเครดิต/เดบิต (Debit/Credit Card)
              </label>
              {showForm === true ? (
                <>
                  <CreditPaymentForm></CreditPaymentForm>
                  <br />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-3 p-0 text-center">
              <Button className="btn btn-outline-primary" href="/menu">
                ย้อนกลับ
              </Button>
            </div>
            <div className="col-1 p-0 text-center"></div>
            <div className="col-3 p-0 text-center">
              <Button type="submit" className="btn btn-outline-primary">
                ยืนยันการชำระเงิน
              </Button>
            </div>
          </div>
        {/* </Form> */}
      </CommonCard>
    </>
  )
}
