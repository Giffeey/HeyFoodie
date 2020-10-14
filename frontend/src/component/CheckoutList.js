import React, { Component } from "react"

class CheckoutList extends Component {
  render() {
    return (
      <div>
        <div className="menulist">
          <ul className="checkoutList list-group">
            {console.log(this.props.menu)}
            {console.log("test")}
            {/* <div><img src={this.props.menu.image} alt='image_menu' height='150px' width='245px'></img></div> */}
            <li>{this.props.menu.name}</li>
            <div>ขนาด : {this.props.menu.size}</div>
            <div>ราคา {this.props.menu.price} ฿</div>
          </ul>
        </div>
      </div>
    )
  }
}
export default CheckoutList
