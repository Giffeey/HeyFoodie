import React, { Component } from "react"
import Ingredient from "./Ingredient"
import Salesize from "./Salesize"
import Dropdown from "react-bootstrap/DropdownButton"

class Menu extends Component {
  constructor(props) {
    super(props)
    this.listIngredient = this.listIngredient.bind(this)
    this.listSalesize = this.listSalesize.bind(this)
  }

  listIngredient = () => {
    const list = this.props.menu.ingredient.map((ingredient, index) => (
      <Ingredient key={index} index={index} ingredient={ingredient} />
    ))
    return list
  }

  listSalesize = () => {
    const list = this.props.salesize.map((salesize, index) => (
      <Salesize key={index} index={index} salesize={salesize} menu={this.props.menu} />
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

            
            <div className="d-flex">
              <div className="mr-auto p-2">
            <Dropdown
              title="Size"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >  
              {this.listSalesize()}
            </Dropdown>
            </div>
            <div className="ml-auto p-2">
              <a className="card-text">199 บาท</a>
              </div>
            </div>
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
