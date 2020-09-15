import React from "react"
import Footer from "./Footer"
import Header from "./Header"

export default function MainLayout(props) {
  const { forwardRef, useRef, useImperativeHandle } = React
  const childRef = useRef();
  
  return (
    <>
      {/* ต้องส่ง ShowCart ใน MenuList ให้กับ Header ด้วย */}
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  )
}
