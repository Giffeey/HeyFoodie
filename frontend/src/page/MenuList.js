import React, { useState, useEffect, useContext } from "react"
import Carousel from "react-bootstrap/Carousel"
import Menu from "../component/Menu/Menu"
import SlideMenu from "../component/Menu/SlideMenu"
import { storesContext } from "../context"
import menuDataService from "../services/menu.service"


function MenuList() {
  const { cartStore } = useContext(storesContext)
  const [menus, setMenus] = useState([])
  const [store, setStore] = useState([])
  const [owner, setOwner] = useState([])
  const [salesize, setSaleSize] = useState([])
  const [ingr, setIngr] = useState([])


  const fetchMenus = async () => {
    const response = await menuDataService.getAll()
    setMenus(response.data)
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const getSaleSize = () =>
    fetch("http://127.0.0.1:8000/api/salesize/").then((res) => res.json())

  useEffect(() => {
    getSaleSize().then((data) => setSaleSize(data))
  }, [])

  const getIngr = () =>
    fetch("http://127.0.0.1:8000/api/ingredient/").then((res) => res.json())

  useEffect(() => {
    getIngr().then((data) => setIngr(data))
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
            salesize={salesize}
            ingr={ingr}
          />
        ))}
      </div>
    </div>
  )
}
export default MenuList
