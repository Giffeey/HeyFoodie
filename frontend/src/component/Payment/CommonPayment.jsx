import React from "react"
import CommonCard from "../Common/CommonCard"
import Button from "react-bootstrap/Button"

export default function CommonPayment() {
  return (
    <>
      <CommonCard>
        <div>
          <h5 className="">รายการสั่งซื้อ</h5>
          {/* wait for map */}
          <div>
            <div class="d-flex">...</div>
          </div>
        </div>

        <div>
          <h5 className="">วิธีการชำระเงิน</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
              checked
            />
            <label class="form-check-label" for="exampleRadios1">
              Cash
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
            />
            <label class="form-check-label" for="exampleRadios2">
              Debit/Credit
            </label>
          </div>
        </div>

        <div className="row justify-content-center">
          <div class="col-3 p-0 text-center">
            <Button className="btn btn-outline-primary" href="/menu">Back</Button>
          </div>
          <div class="col-1 p-0 text-center"></div>
          <div class="col-3 p-0 text-center">
            <Button className="btn btn-outline-primary">Confirm</Button>
          </div>
        </div>
      </CommonCard>
    </>
  )
}
