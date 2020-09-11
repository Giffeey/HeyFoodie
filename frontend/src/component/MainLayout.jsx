import React from "react"
import Footer from "./Footer"
import Header from "./Header"

export default function MainLayout(props) {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  )
}
