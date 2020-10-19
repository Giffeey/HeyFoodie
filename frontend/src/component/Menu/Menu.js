import Ingredient from "./Ingredient"
import Dropdown from "react-bootstrap/DropdownButton"
import Select from "react-select"
import React, { useContext, useEffect, useState } from "react"
import IngredientList from "./IngredientList"

const Menu = (props) => {
  const [selected, setSelected] = useState({ size: "", price: 0.0 })
  const [selectOptions, setSelectOptions] = useState([])

  const listIngredient = () => {
    const list = props.menu.ingredient.map((ingredient, index) => (
      <Ingredient key={index} index={index} ingredient={ingredient} />
    ))
    return list
  }

  const listSalesize = () => {
    const options = props.menu.salesize.map((salesize, index) => ({
      value: salesize.price,
      label: salesize.size,
    }))

    setSelectOptions(options)
  }

  const handleChange = (selectedOptions) => {
    setSelected({ price: selectedOptions.value, size: selectedOptions.label })
  }

  const handleAddItemToCart = () => {
    const menu = {
      ...props.menu,
      ...selected,
    }
    props.handleAddItemToCart(menu)
  }

  useEffect(() => {
    listSalesize()
  }, [])

  const [showForm, setShowForm] = useState(false)
  return (
    <div className="card">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img
            className="card-img"
            src={props.menu.image}
            alt="image_menu"
          ></img>
        </div>
        <div className="col-md-6">
          <h5 className="card-title">{props.menu.name}</h5>
          <ul className="list-unstyled inline">{listIngredient()}</ul>
          <div style={{ width: "200px" }}>
            <Select
              readonly
              onChange={handleChange}
              options={selectOptions}
              placeholder="Select Size"
            />
          </div>
          <br></br>
          {/* <p className="card-text">  */}
          {selected.price !== 0 ? (
            <p className="card-text"> {selected.price} บาท </p>
          ) : (
            ""
          )}

          {/* </p> */}
        </div>

        <div className="col-md-2 button">
          <button
            type="submit"
            name="add_to_cart"
            className="btn btn-outline-primary"
            onClick={() => handleAddItemToCart()}
          >
            เลือก
          </button>
        </div>
      </div>
      <div className="col-md-12">
        <hr />
      </div>
      <a className="a-form" onClick={() => setShowForm(true)}>
        {" "}
        ปรับแต่งเมนูด้วยตัวเอง{" "}
      </a>
      {showForm === true ? (
        <>
          <IngredientList></IngredientList>
          <br />
          <a className="a-form" onClick={() => setShowForm(false)}>
            {" "}^{" "}
          </a>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
export default Menu
