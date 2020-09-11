import React from "react"
import home from "../img/home/home.jpg"
import home2 from "../img/home/home2.png"
import Carousel from "react-bootstrap/esm/Carousel"

export default function SlideMenu() {
  return (

    <Carousel>
      <Carousel.Item>
      <img src={home} class="d-block w-100" alt="..."/>
      </Carousel.Item>
      <Carousel.Item>
      <img src={home2} class="d-block w-100" alt="..."/>
      </Carousel.Item>
    </Carousel>


  )
}
