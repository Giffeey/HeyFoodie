import React, { useContext, useEffect } from "react"
import { storesContext } from "../context"
import Footer from "./Footer"
import Header from "./Navbar/Header"

export default function MainLayout(props) {
  const { forwardRef, useRef, useImperativeHandle } = React
  const childRef = useRef()
  const { component: Child } = props

  return (
    <>
      <Header {...props}></Header>
      <Child {...props} />
      <Footer></Footer>
    </>
  )
}
