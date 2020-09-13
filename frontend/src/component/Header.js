import React, { Component } from "react"
import user from "../img/icon/user.png"
// import MenuList from './MenuList';
import Button from "react-bootstrap/Button"
import cart from "../img/icon/cart.png"
import Cart from "./Cart"
import Popover from "react-bootstrap/Popover"
import { Nav, Navbar } from "react-bootstrap"
import FacebookLogin from "react-facebook-login"


export default function Header(props) {
  
  const fbResponse = (response) => {
    console.log(response);
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="food-navbar-expand-lg">
      <a className="navbar-brand" href="/">
        {props.store?.storename || "Hey!Foodie"}
      </a>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            {/* <a className="navbar-link" href="/login"> */}
            {/* <img className="nav-user" src={user} alt="img-user"></img>
              Login */}
            <div className="Facebook">
              <FacebookLogin
                textButton="Login With Facebook"
                appId="319223145838224"
                fields="name,email,picture"
                callback={fbResponse}
              />
            </div>
            {/* </a> */}
          </Nav.Item>
          <Nav.Item>
            <Button className="btn-cart ml-auto">
              <img className="nav-cart" src={cart} alt="img-cart"></img>
              <span className="badge badge-secondary badge-pill">
                {props.quantity}
              </span>
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
