import React, { useState, useEffect, useContext } from "react"
import Menu from "../component/Menu/Menu"
import SlideMenu from "../component/Menu/SlideMenu"
import { storesContext } from "../context"
import menuDataService from "../services/menu.service"

function MenuList() {
  const { cartStore } = useContext(storesContext)
  const [menus, setMenus] = useState([])

  // use Axios
  const fetchMenus = async () => {
    const response = await menuDataService.getAll()
    setMenus(response.data)
  }

  useEffect(() => {
    fetchMenus()
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
          />
        ))}
      </div>
    </div>
  )
}
export default MenuList
