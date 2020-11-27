import React, { useContext, useEffect } from "react"
import { storesContext } from "../context"
import Footer from "./Footer"
import Header from "./Navbar/Header"

export default function MainLayout(props) {
  const { component: Child } = props

  return (
    <>
      <Header {...props}></Header>
      <Child {...props} />
      <Footer></Footer>
    </>
  )
}
