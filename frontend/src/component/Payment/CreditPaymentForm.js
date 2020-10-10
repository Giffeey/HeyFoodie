import React, { Component } from "react";
import { Form } from "react-bootstrap";

class CreditPaymentForm extends Component {

    render() {
        return (
            <Form action="/checkout" method="post" id="checkout">
                <div id="token_errors"></div>

                <input type="hidden" name="omise_token" />

                <div>
                    Name<br />
                    <input type="text" data-omise="holder_name" />
                </div>

                <div>
                    Number<br />
                    <input type="text" data-omise="number" />
                </div>
                <div>
                    Date<br />
                    <input type="text" data-omise="expiration_month" size="4" /> /
                    <input type="text" data-omise="expiration_year" size="8" />
                </div>
                <div>
                    Security Code<br />
                    <input type="text" data-omise="security_code" size="8" />
                </div>

                <input type="submit" id="create_token" />
            </Form>
        );
    }
}
export default CreditPaymentForm;

