import React, { Component } from 'react';
import del from '../../img/icon/remove.png';

class CartItem extends Component {

    render() {
        return (
            <li className="list-menu">
                <div className="text-left">
                    <button className="btn-del"
                        onClick={() => this.props.handleRemoveSingleItemOnCart(this.props.index)}>
                        <img className="img-icon" src={del} alt="img-del" />
                    </button>
                    {this.props.menu.name}</div>
                {/* <div className="text-right">ราคา {this.props.menu.price} ฿</div> */}
            </li>
        );
    }
}
export default CartItem;