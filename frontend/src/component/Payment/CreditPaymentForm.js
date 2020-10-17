import React, { Component } from "react"
import { Form } from "react-bootstrap"

export default function CreditPaymentForm() {
  return (
    <div>
      <Form action="/checkout" method="post" id="checkout">
        <div id="token_errors"></div>
        <hr />
        <input type="hidden" name="omise_token" aria-describedby="emailHelp" />

        <div class="d-flex justify-content-center">
          <p>หมายเลขบัตรเครดิต/เดบิต (Card Number)</p>
          <input
            class="input-form"
            type="text"
            data-omise="number"
            placeholder="Card Number"
          />
        </div>

        <div class="d-flex justify-content-center">
          <p>ชื่อผู้ถือบัตร (Card Name)</p>
          <input
            class="input-form"
            type="text"
            data-omise="holder_name"
            placeholder="Card Name"
          />
        </div>

        <div class="d-flex justify-content-center">
          <p>วันหมดอายุ (Expiry Date)</p>
          <input
            class="input-form"
            type="text"
            data-omise="expiration_month"
            size="2"
            placeholder="mm"
          />
          <input
            class="input-form"
            type="text"
            data-omise="expiration_year"
            size="2"
            placeholder="yy"
          />
          <p>CVV</p>
          <input
            class="input-form"
            type="text"
            data-omise="security_code"
            size="3"
            type="password"
            placeholder="xxx"
          />
        </div>

        <input type="submit" id="create_token" />
      </Form>
    </div>
  )
}
