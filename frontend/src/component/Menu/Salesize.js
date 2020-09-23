import React, { Component } from "react";

class Salesize extends Component {

    render() {
        return (
            <a className="dropdown-item">
                {this.props.salesize.size} {this.props.salesize.price} {this.props.salesize.menu}
            </a>
        );
    }
}
export default Salesize;