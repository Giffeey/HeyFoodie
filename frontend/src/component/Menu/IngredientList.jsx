import React from "react"

export default function IngredientList(props) {
  return (
    <div className="container">
      <div className="col-4">
        <h5>ส่วนผสมหลัก</h5>
      </div>
      <div className="col-12">
        <div className="ml-5 row">
          {props.menu?.ingredient?.map((ingredient) => {
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
              </div>
            )
          })}
        </div>
      </div>
      <br/>
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
