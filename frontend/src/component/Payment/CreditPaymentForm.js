import React, { Component } from "react";
import { Form } from "react-bootstrap";

class CreditPaymentForm extends Component {

    render() {
        return (
            <Form action="/checkout" method="post" id="checkout">
                <div id="token_errors"></div>
                <hr/>
                <input type="hidden" name="omise_token" aria-describedby="emailHelp" />
                
                <div>
                    หมายเลขบัตรเครดิต/เดบิต (Card Number)<br />
                    <input type="text" data-omise="number" placeholder="Card Number"/>
                </div>

                <div>
                    ชื่อผู้ถือบัตร (Card Name)<br />
                    <input type="text" data-omise="holder_name"  placeholder="Card Name"/>
                </div>

                <div>
                    วันหมดอายุ (Expiry Date)<br />
                    <input type="text" data-omise="expiration_month" size="2" placeholder="mm"/>
                    <input type="text" data-omise="expiration_year" size="2" placeholder="yy"/>
                </div>
                <div>
                    CVV<br />
                    <input type="text" data-omise="security_code" size="3" type="password" placeholder="xxx"/>
                </div>

                <input type="submit" id="create_token" />
            </Form>
        );
    }
}
export default CreditPaymentForm;

