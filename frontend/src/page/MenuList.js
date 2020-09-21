import React, { useState, useEffect, useContext } from "react"
import Carousel from "react-bootstrap/Carousel"
import home from "../img/home/home.jpg"
import home2 from "../img/home/home2.png"
import Menu from "../component/Menu"
import Cart from "../component/Cart"
import SlideMenu from "../component/SlideMenu"
import { storesContext } from "../context"

// import Popover from 'react-bootstrap/Popover';

function MenuList() {
  const { cartStore } = useContext(storesContext)
  const [menus, setMenus] = useState([])
  const [prices, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [store, setStore] = useState([])
  const [owner, setOwner] = useState([])
  const [salesize, setSaleSize] = useState([])

  const getItems = () =>
    fetch("http://127.0.0.1:8000/api/menu/").then((res) => res.json())

  useEffect(() => {
    getItems().then((data) => setMenus(data))
  }, [])

  const getSaleSize = () =>
    fetch("http://127.0.0.1:8000/api/salesize/").then((res) => res.json())

  useEffect(() => {
    getSaleSize().then((data) => setSaleSize(data))
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

  const handleAddItemToCart = (data) => {
    let tempCart = [...cartStore.currentCart]
    const menu = {
      ...data,
      quantity: 1,
    }
    if (tempCart.length != 0) {
      let hasMenu = false
      tempCart.forEach((value) => {
        if (value.menu_id === data.menu_id) {
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
  }

  return (
    <div>
      <SlideMenu></SlideMenu>
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
