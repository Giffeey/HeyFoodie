import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import MenuList from "./page/MenuList"
import Login from "./page/Login"
import MainLayout from "./component/MainLayout"
import DetailMenu from "./page/DetailMenu"
import PaymentCash from "./page/PaymentCash"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MainLayout>
            <Switch>
              <Route exact path={["/", "/menu"]} component={MenuList} />
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/detailmenu"} component={DetailMenu} />
              <Route exact path={"/paymentcash"} component={PaymentCash} />
            </Switch>
          </MainLayout>
        </div>
      </Router>
    )
  }
}
export default App
