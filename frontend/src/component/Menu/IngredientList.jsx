import React from "react"

export default function IngredientList(props) {
  return (
    <div className="container">
      <div className="col-2">
        <h5>ส่วนผสมหลัก</h5>
      </div>
      <div className="d-flex justify-content-around">
        {props.menu?.ingredient?.map((ingredient) => {
          return (
            <div className="p-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
              />
              {ingredient.ingredient_name}
            </div>
          )
        })}
      </div>
      <div className="col-2">
        <h5>ส่วนผสมเพิ่มเติม</h5>
      </div>
      <div className="col-8">
      <div className="d-flex">
        {props.ingr?.map((ingredient) => {
          return (
            <div className="p-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
              />
              {ingredient.ingredient_name}
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}
