import React, { Component } from "react"
import Ingredient from "../Ingredient"

class Menu extends Component {
  constructor(props) {
    super(props)
    this.listIngredient = this.listIngredient.bind(this)
  }

  listIngredient = () => {
    const list = this.props.menu.ingredient.map((ingredient, index) => (
      <Ingredient key={index} index={index} ingredient={ingredient} />
    ))
    return list
  }

  render() {
    return (
      <div className="card">
        <div className="row no-gutters">
          <div className="col-md-3">
            <img
              className="card-img"
              src={this.props.menu.image}
              alt="image_menu"
            ></img>
          </div>
          <div className="col-md-6">
            <h5 className="card-title">{this.props.menu.name}</h5>
            <ul className="list-unstyled inline">{this.listIngredient()}</ul>
            {/* <p className="card-text">{this.props.menu.price} บาท</p> */}
          </div>
          <div className="col-md-2 button">
            <button
              type="submit"
              name="add_to_cart"
              className="btn btn-primary"
              onClick={() => this.props.handleAddItemToCart(this.props.menu)}
            >
              เลือก
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Menu
