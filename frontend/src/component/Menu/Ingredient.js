import React, { Component } from "react";

class Ingredient extends Component {

    render() {
        return (
            <li className="list-ingredient list-unstyled">
                {this.props.ingredient.ingredient_name} &nbsp;
            </li>
        );
    }
}
export default Ingredient;