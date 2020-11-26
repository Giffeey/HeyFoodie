import React, { useContext, useState } from "react"
import CommonCard from "../Common/CommonCard"
import Button from "react-bootstrap/Button"
import CheckoutList from "../CheckoutList"
import CreditPaymentForm from "./CreditPaymentForm"
import { storesContext } from "../../context"
import { Form } from "react-bootstrap"
import dayjs from "dayjs"
import orderService from "../../services/orderDetail.service"
import { navigate } from "@reach/router"

// import CreditPaymentSubmit from "./CreditPaymentSubmit"

export default function CommonPayment(props) {
  const { cartStore, userStore } = useContext(storesContext)
  const [showForm, setShowForm] = useState(false)
  // const handleShowForm = (boolean) => {
  //   setShowForm(boolean)
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userStore.customer && userStore.user) {
      const orderMenu = {
        date: dayjs().toISOString(),
        order_status: "WAITING",
        customer: userStore.customer.id,
        menus: cartStore.currentCart.map((item) => {
          return {
            menu_id: item.menu_id,
            name: item.name,
            category: {
              category_id: item.category.category_id,
              category_name: item.category.category_name,
            },
            ingredient: item.ingredient.map((ing) => {
              return {
                Ingredient_category: {
                  ingredient_category_id:
                    ing.Ingredient_category.ingredient_category_id,
                  name: ing.Ingredient_category.name,
                },
                ingredient_category_id: ing.ingredient_category_id,
                name: ing.name,
                image: ing.image,
                ingredient_id: ing.ingredient_id,
                ingredient_name: ing.ingredient_name,
              }
            }),
            salesize: {
              salesize_id: item.salesize_id,
              size: item.size,
              price: item.price,
            },
            quantity: item.quantity,
            image: item.image,
          }
        }),
      }
      await orderService.create(orderMenu)
      navigate("/queuepage")
    } else {
      alert("กรุณา Login ก่อนทำการสั่งซื้อสินค้า")
    }
  }

  return (
    <>
      <CommonCard>
        <Form onSubmit={handleSubmit} id="checkout">
          <h4 className="">รายการสั่งซื้อ</h4>
          {cartStore.currentCart.length >= 1 ? (
            <div>
              <div>
                {console.log(cartStore.currentCart)}
                {cartStore.currentCart.map((menu, index) => (
                  <CheckoutList key={index} menu={menu} />
                ))}
              </div>
              <h5 className="d-flex justify-content-end p-2 bd-highlight">
                รวม :{" "}
                {cartStore.currentCart.length != 0 &&
                  cartStore.currentCart
                    .map((item) => item.price * item.quantity)
                    .reduce((totalPrice, price) => price + totalPrice)}{" "}
                .00 ฿
              </h5>
            </div>
          ) : (
            <div className="text-center">
              <div className="noItem">ไม่มีสินค้าในตะกร้าของคุณ</div>
            </div>
          )}
          <div>
            <h4 className="">วิธีการชำระเงิน</h4>
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
              {/* {showForm === true ? (
                <>
                  <CreditPaymentForm></CreditPaymentForm>
                  <br />
                </>
              ) : (
                ""
              )} */}
            </div>
          </div>
          <br/>
          <div className="row justify-content-center">
            <div className="col-3 p-0 text-center">
              <Button
                className="btn btn-outline-primary"
                onClick={() => navigate("/")}
              >
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
        </Form>
      </CommonCard>
    </>
  )
}
