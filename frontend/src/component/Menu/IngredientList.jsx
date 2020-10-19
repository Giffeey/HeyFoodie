import React from "react"

export default function IngredientList() {
  return (
    <div className="row no-gutters">
      <div className="col-md-6">
        <h5>ส่วนผสมหลัก</h5>
        <div>
          <ul>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                defaultChecked
              />
            </li>
            <label>Ingredient 1</label>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                
              />
            </li>
            <label>Ingredient 2</label>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                
              />
            </li>
            <label>Ingredient 3</label>
          </ul>
        </div>
        <h5>ซอส</h5>
      </div>
    </div>
  )
}
