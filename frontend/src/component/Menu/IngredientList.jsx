import React from "react"
import remove from "../../img/icon/remove.png"
import plus from "../../img/icon/plus.png"

export default function IngredientList(props) { 
  // const handleRemoveIngredient = (index) => {
  //   let carts = [...cartStore.currentCart]
  //   if (carts[index].quantity != 1) {
  //     carts[index].quantity -= 1
  //   } else {
  //     carts.splice(index, 1)
  //   }
  //   cartStore.setCart(carts)
  //   setShowCart(cartStore.currentCart)
  // }

  // const handleAddIngredient = (index) => {
  //   let tempCart = [...cartStore.currentCart]
  //   let data = tempCart[index]

  //   const menu = {
  //     ...data,
  //     quantity: 1,
  //   }
  //   if (tempCart.length != 0) {
  //     let hasMenu = false
  //     tempCart.forEach((value) => {
  //       if (value.menu_id === data.menu_id && data.size === value.size) {
  //         value.quantity += 1
  //         hasMenu = true
  //         return
  //       }
  //     })
  //     if (!hasMenu) {
  //       tempCart.push(menu)
  //     }
  //   } else {
  //     tempCart.push(menu)
  //   }

  //   cartStore.setCart(tempCart)
  //   setShowCart(cartStore.currentCart)
  // }

  return (
    <div className="container">
      <div className="col-4">
        <h5>ส่วนผสมเพิ่มเติม</h5>
      </div>
      <div className="col-12">
        <div className="ml-5 row">
          {props.ingr?.map((ingredient) => {
            return (
              <div className="col-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="option2"
                />
                {ingredient.ingredient_name}
                <br />
                {ingredient.price}
                <br />
                <div>
                  <a
                    // onClick={() => handleRemoveIngredient(index)}
                    className="mx-2"
                  >
                    <img
                      className="img-icon"
                      src={remove}
                      alt="img-remove"
                    ></img>
                  </a>
                  <span className="mx-2">
                    {/* {item.quantity} */}
                    2</span>
                  <a
                    className="mx-2"
                    // onClick={() => handleAddIngredient(index)}
                  >
                    <img className="img-icon" src={plus} alt="img-plus"></img>
                  </a>
                </div>
                {/* <div className="col-md-2 button">
                  <button
                    type="submit"
                    name="add_to_cart"
                    className="btn btn-outline-primary"
                    onClick={() => handleAddItemToCart()}
                  >
                    เพิ่มส่วนผสม
                  </button>
                </div> */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
