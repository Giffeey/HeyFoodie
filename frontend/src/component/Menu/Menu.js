import React, { Component } from "react"
import Ingredient from "./Ingredient"
import Dropdown from "react-bootstrap/DropdownButton"
import Select from "react-select"

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
      price: 0.0,
    }
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
    const options = this.props.menu.salesize.map((salesize, index) => ({
      value: salesize.price,
      label: salesize.size,
    }))

    this.setState({ selectOptions: options })
  }

  handleChange = (selectedOptions) => {
    this.setState({ price: selectedOptions.value, name: selectedOptions.label })
  }

  handleAddItemToCart = () => {
    const menu = {
      ...this.props.menu,
      price: this.state.price,
      size: this.state.name,
    }
    this.props.handleAddItemToCart(menu)
  }

  componentDidMount() {
    this.listSalesize()
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
            <div style={{ width: "200px" }}>
              <Select
                readonly
                onChange={this.handleChange}
                options={this.state.selectOptions}
                placeholder="Select Size"
              />
            </div>
            <br></br>
            {/* <p className="card-text">  */}
              {this.state.price !== 0 ?
                <p className="card-text"> {this.state.price} บาท </p> : "" }
              
            {/* </p> */}
          </div>

          <div className="col-md-2 button">
            <button
              type="submit"
              name="add_to_cart"
              className="btn btn-outline-primary"
              onClick={() => this.handleAddItemToCart()}
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
