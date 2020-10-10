import React, {useContext, useState} from "react"
import CommonCard from "../Common/CommonCard"
import Button from "react-bootstrap/Button"
import CheckoutList from "../CheckoutList"
import CreditPaymentForm from "./CreditPaymentForm"
import { storesContext } from "../../context"


export default function CommonPayment(props) {
  const { cartStore, userStore } = useContext(storesContext)
  const [ showForm, setShowForm ] = useState(false)
  // const handleShowForm = (boolean) => {
  //     setShowForm(boolean)
  // }
  return (
    <>
      <CommonCard>
        <div>
          <h5 className="">รายการสั่งซื้อ</h5>
          {/* wait for map */}
          <div>
            <div className="d-flex">
              {/* {console.log(cartStore.currentCart)} */}
            {cartStore.currentCart.map((menu, index) => (
          <CheckoutList
            key={index}
            menu={menu}
          />
        ))}
            </div>
          </div>
        </div>

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
              Cash
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
              onClick={() => setShowForm(true)}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Debit/Credit
            </label>
              {showForm === true ? 
                <><CreditPaymentForm></CreditPaymentForm><br/></> : ""}
          </div>

          
        </div>

        <div className="row justify-content-center">
          <div className="col-3 p-0 text-center">
            <Button className="btn btn-outline-primary" href="/menu">Back</Button>
          </div>
          <div className="col-1 p-0 text-center"></div>
          <div className="col-3 p-0 text-center">
            <Button className="btn btn-outline-primary">Confirm</Button>
          </div>
        </div>
      </CommonCard>
    </>
  )
}
