import React, { Component } from 'react';

class CheckoutList extends Component {

    render() {
        return (
            <div>
                <div className="menulist">
                    <ul className="checkoutList">
                        {console.log(this.props.menu)}
                        {console.log("test")}
                        <div><img src={this.props.menu.image} alt='image_menu' height='250px' width='350px'></img></div>
                        <div>{this.props.menu.name}</div>
                        <div>{this.props.menu.size}</div>
                        <div>ราคา {this.props.menu.price} ฿</div>
                    </ul>
                </div>


            </div>
        );
    }

}
export default CheckoutList;