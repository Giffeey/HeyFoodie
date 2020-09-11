import React, { useState, useEffect } from "react"
import Carousel from "react-bootstrap/Carousel"
import home from "../img/home/home.jpg"
import home2 from "../img/home/home2.png"
import Menu from "../component/Menu"
import Cart from "../component/Cart"
import Header from "../component/Header"
import Footer from "../component/Footer"
// import Popover from 'react-bootstrap/Popover';

function MenuList() {
  const [cart, setCart] = useState([])
  const [menus, setMenus] = useState([])
  const [prices, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [store, setStore] = useState([])
  const [owner, setOwner] = useState([])

  const getItems = () =>
    fetch("http://127.0.0.1:8000/api/menu/").then((res) => res.json())

  useEffect(() => {
    getItems().then((data) => setMenus(data))
  }, [])

  const getStore = () =>
    fetch("http://127.0.0.1:8000/api/store/1").then((res) => res.json())

  useEffect(() => {
    getStore().then((data) => setStore(data))
  }, [])

  const getOwner = () =>
    fetch("http://127.0.0.1:8000/api/owner/1").then((res) => res.json())

  useEffect(() => {
    getOwner().then((data) => setOwner(data))
  }, [])

  const handleAddItemToCart = (menu) => {
    const tempCart = [...cart]
    tempCart.push(menu)
    setCart(tempCart)
    const amountTotal = prices + parseFloat(menu.price)
    setTotalPrice(amountTotal)
    const itemQuantity = quantity + 1
    setQuantity(itemQuantity)
  }

  const handleRemoveSingleItemOnCart = (index) => {
    const tempCart = [...cart]
    const menu = tempCart[index]
    tempCart.splice(index, 1)
    setCart(tempCart)
    const amountTotal = prices - parseFloat(menu.price)
    setTotalPrice(amountTotal)
    const itemQuantity = quantity - 1
    setQuantity(itemQuantity)
  }

  const showCart = () => (
    <div>
      <Cart
        cart={cart}
        handleRemoveSingleItemOnCart={handleRemoveSingleItemOnCart}
        prices={prices}
      />
    </div>
  )

  return (
    <div>
      <div className="ctn">
        <Carousel className="carousel">
          <Carousel.Item>
            <img className="d-block w-100" src={home} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={home2} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="ctn-menu">
        {menus.map((menu, index) => (
          <Menu
            className="card w-50"
            key={index}
            handleAddItemToCart={handleAddItemToCart}
            menu={menu}
          />
        ))}
      </div>
    </div>
  )
}
export default MenuList
