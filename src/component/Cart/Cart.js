import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.createCart = this.createCart.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange = () => {
    this.props.history.push({
    pathname: '/Checkout',
    state: {cart: this.props.cart}})
  }

  createCart = () => {

    const list = this.props.cart.map((menu, index) => (
      <CartItem
        key={index}
        index={index}
        handleRemoveSingleItemOnCart={
          this.props.handleRemoveSingleItemOnCart
        }
        menu={menu}
      />
    ));
    return list;
  };
 
  render() {
    if (this.props.quantity >= 1) {
      return (
        
        <div className="card cart">
          <div className="card-block">
            <ul className="list-group list-unstyled">
              {this.createCart()}
            </ul>
          </div>

          <div className="total text-right">
            ราคารวม {this.props.prices}.00 ฿
        </div>
          <div className="order">
            <button className="btn btn-primary order" onClick={this.routeChange} >สั่งซื้อ</button>
          </div>
        </div>
      );
    }
    return (

      <div className="card cart text-center">
        <div className="noItem">
          ไม่มีสินค้าในตะกร้าของคุณ
        </div>
      </div>

    );
  }
}

export default withRouter(Cart);
