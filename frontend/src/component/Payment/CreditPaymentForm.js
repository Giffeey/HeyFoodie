import React, { Component, useState } from "react"

export default function CreditPaymentForm(props) {
  return (
    <div>
      <div id="token_errors"></div>
      <hr />
      <input type="hidden" name="omise_token" aria-describedby="emailHelp" />

      <div class="d-flex justify-content-center">
        <p>หมายเลขบัตรเครดิต/เดบิต (Card Number)</p>
        <input
          class="input-form"
          type="text"
          data-omise="number"
          id="card_no"
          placeholder="Card Number"
        />
      </div>

      <div class="d-flex justify-content-center">
        <p>ชื่อผู้ถือบัตร (Card Name)</p>
        <input
          class="input-form"
          type="text"
          id="holder_name"
          data-omise="holder_name"
          placeholder="Card Name"
        />
      </div>

      <div class="d-flex justify-content-center">
        <p>วันหมดอายุ (Expiry Date)</p>
        <input
          class="input-form"
          type="text"
          id="expiration_month"
          data-omise="expiration_month"
          size="2"
          placeholder="mm"
        />
        <input
          class="input-form"
          type="text"
          id="expiration_year"
          data-omise="expiration_year"
          size="2"
          placeholder="yy"
        />
        <p>CVV</p>
        <input
          class="input-form"
          type="text"
          id="security_code"
          data-omise="security_code"
          size="3"
          type="password"
          placeholder="***"
        />
      </div>
    </div>
  )
}
