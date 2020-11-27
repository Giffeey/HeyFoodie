import React, { Component } from "react"

class CheckoutList extends Component {
  render() {
    return (
      <div>
        <div className="menulist">
          <ul className="checkoutList list-group list-group-flush">
            {console.log(this.props.menu)}
            {console.log("test")}
            {/* <div><img src={this.props.menu.image} alt='image_menu' height='150px' width='245px'></img></div> */}
            <li className="list-group-item">
              <h5>{this.props.menu.name}</h5>
              <div className="d-flex justify-content-between">
                <div className="p-2">ขนาด : {this.props.menu.size}</div>
                <div className="p-2">x {this.props.menu.quantity}</div>
                <div className="p-2">ราคา {this.props.menu.price} ฿</div>
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default CheckoutList
