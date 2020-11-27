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
      salesize_id: salesize.salesize_id,
    }))
    if (options.length != 0) {
      setSelected({
        ...options[0],
        size: options[0].label,
        price: options[0].value,
        salesize_id: options[0].salesize_id,
      })
      setSelectOptions(options)
    }
  }

  const handleChange = (selectedOptions) => {
    setSelected({
      ...selectedOptions,
      price: selectedOptions.value,
      size: selectedOptions.label,
      salesize_id: selectedOptions.salesize_id,
    })
  }

  const handleAddItemToCart = () => {
    const menu = {
      ...props.menu,
      ...selected,
    }
    console.log(menu)
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
              value={selected}
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
      {/* <div className="col-md-12">
        <hr />
      </div>
      <a className="a-form" onClick={() => setShowForm(true)}>
        {" "}
        ปรับแต่งเมนูด้วยตัวเอง{" "}
      </a>
      {showForm === true ? (
        <>
          <IngredientList {...props}></IngredientList>
          <a className="a-form" onClick={() => setShowForm(false)}>
            {" "}
            ^{" "}
          </a>
        </>
      ) : (
        ""
      )} */}
    </div>
  )
}
export default Menu
