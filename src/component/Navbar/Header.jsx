import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import user from "../../img/icon/user.png"
import remove from "../../img/icon/remove.png"
import plus from "../../img/icon/plus.png"
// import MenuList from './MenuList';
import Button from "react-bootstrap/Button"
import cart from "../../img/icon/cart.png"
import { navigate } from "@reach/router"
import { FaBars, FaTimes } from "react-icons/fa"

import {
  Badge,
  Nav,
  Navbar,
  NavItem,
  PopoverContent,
  PopoverTitle,
} from "react-bootstrap"

import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { storesContext } from "../../context"
import ModalLogin from "../Login/ModalLogin"
import Payment from "../../page/PaymentPage"
import CartItem from "../Cart/CartItem"

export default function Header(props) {
  const { cartStore, userStore, salesizeStore } = useContext(storesContext)
  const [showCart, setShowCart] = useState(cartStore.currentCart)
  const today = new Date()
  const timeNow =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  const handleRemoveCartIndex = (index) => {
    let carts = [...cartStore.currentCart]
    if (carts[index].quantity != 1) {
      carts[index].quantity -= 1
    } else {
      carts.splice(index, 1)
    }
    cartStore.setCart(carts)
    setShowCart(cartStore.currentCart)
  }

  const handleAddItemToCart = (index) => {
    let tempCart = [...cartStore.currentCart]
    let data = tempCart[index]

    const menu = {
      ...data,
      quantity: 1,
    }
    if (tempCart.length != 0) {
      let hasMenu = false
      tempCart.forEach((value) => {
        if (value.menu_id === data.menu_id && data.size === value.size) {
          value.quantity += 1
          hasMenu = true
          return
        }
      })
      if (!hasMenu) {
        tempCart.push(menu)
      }
    } else {
      tempCart.push(menu)
    }

    cartStore.setCart(tempCart)
    setShowCart(cartStore.currentCart)
  }

  const renderShowCart = useMemo(
    () => (
      <>
        {salesizeStore.store?.close_order > timeNow}
        <Button
          className="btn-cart"
          id="UncontrolledPopover"
          onClick={() => setShowCart(cartStore.currentCart)}
          type="button"
        >
          <img className="nav-cart" src={cart} alt="img-cart"></img>
          <span className="badge badge-secondary badge-pill badge-bottom">
            {showCart.length != 0 &&
              showCart
                .map((item) => item.quantity)
                .reduce((count, quantity) => count + quantity)}
          </span>
        </Button>
      </>
    ),
    [showCart]
  )

  const showProverBody = useMemo(
    () => (
      <PopoverBody className="popover">
        {showCart.length != 0 ? (
          <>
            {showCart.map((item, index) => {
              return (
                <div>
                  <p>{item.name}</p>
                  <p>หมวดหมู่ : {item.category?.category_name}</p>
                  <p>ขนาด : {item.size}</p>
                  <div className="d-flex justify-content-end p-2 bd-highlight">
                    <a
                      onClick={() => handleRemoveCartIndex(index)}
                      className="mx-2"
                    >
                      <img
                        className="img-icon"
                        src={remove}
                        alt="img-remove"
                      ></img>
                    </a>
                    <span className="mx-2">{item.quantity}</span>
                    <a
                      className="mx-2"
                      onClick={() => handleAddItemToCart(index)}
                    >
                      <img className="img-icon" src={plus} alt="img-plus"></img>
                    </a>
                  </div>
                </div>
              )
            })}
            <p className="d-flex justify-content-end p-2 bd-highlight">
              รวม :{" "}
              {showCart.length != 0 &&
                showCart
                  .map((item) => item.price * item.quantity)
                  .reduce((totalPrice, price) => price + totalPrice)}{" "}
              ฿
            </p>
            {console.log(props.history)}
            <div className="order">
              <Button
                className="btn btn-primary order"
                onClick={() => navigate("/paymentpage")}
              >
                สั่งซื้อ
              </Button>
            </div>
          </>
        ) : (
          "ไม่มีสินค้าในตะกร้าของคุณ"
        )}
      </PopoverBody>
    ),
    [showCart]
  )

  return (
    <Navbar collapseOnSelect expand="lg" className="food-navbar-expand-lg">
      <a className="navbar-brand" onClick={() => navigate("/")}>
        {salesizeStore.store?.storename || "Hey!Foodie"}
      </a>

      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item className="mt-3">
            <ModalLogin userStore={userStore} {...props}></ModalLogin>
          </Nav.Item>
          <Nav.Item className="m-3">{renderShowCart}</Nav.Item>
          <NavItem>
            <UncontrolledPopover
              placement="bottom"
              target="UncontrolledPopover"
            >
              {showProverBody}
            </UncontrolledPopover>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
