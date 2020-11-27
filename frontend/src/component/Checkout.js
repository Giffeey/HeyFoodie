import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import CheckoutList from "./CheckoutList";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.checkoutList = this.checkoutList.bind(this);

    }

    checkoutList = () => {
        const list = this.props.location.state.cart.map((menu, index) => (

            <CheckoutList
                key={index}
                index={index}
                menu={menu}
            />
        ));

        return list;
    };


    render() {
        console.log(this.props.location.state.cart);

        return (
            <div><ul className="list-group list-unstyled">
                {this.checkoutList()}
            </ul>
                {/* <div><button onClick={this.props.history.goBack}>Back</button></div> */}

            </div>
        );
    }
}
export default withRouter(Checkout);


