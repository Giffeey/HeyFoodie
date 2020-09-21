import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import user from "../img/icon/user.png"
// import MenuList from './MenuList';
import Button from "react-bootstrap/Button"
import cart from "../img/icon/cart.png"
import {
  Nav,
  Navbar,
  NavItem,
  PopoverContent,
  PopoverTitle,
} from "react-bootstrap"

import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { storesContext } from "../context"
import ModalLogin from "./Login/ModalLogin"

export default function Header(props) {
  const { cartStore } = useContext(storesContext)
  const [showCart, setShowCart] = useState(cartStore.currentCart)

  setInterval(() => {
    setShowCart(cartStore.currentCart)
  }, 150)

  return (
    <Navbar collapseOnSelect expand="lg" className="food-navbar-expand-lg">
      <a className="navbar-brand" href="/">
        {props.store?.storename || "Hey!Foodie"}
      </a>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item className="mt-3">
            {/* <a
              className="navbar-link"
              href="/login"
            >
              <img className="nav-user" src={user} alt="img-user"></img>
              Login
            </a> */}

            <ModalLogin></ModalLogin>
            
          </Nav.Item>
          <Nav.Item className="m-3">
            <Button className="btn-cart" id="UncontrolledPopover" type="button">
              <img className="nav-cart" src={cart} alt="img-cart"></img>
              <span className="badge badge-secondary badge-pill">
                {props.quantity}
              </span>
            </Button>
          </Nav.Item>
          <NavItem>
            <UncontrolledPopover
              className="popover"
              placement="bottom"
              target="UncontrolledPopover"
            >
              <PopoverBody className="text-center">
                {showCart.length != 0
                  ? showCart.length
                  : "No Orders in your cart."}
              </PopoverBody>
            </UncontrolledPopover>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
