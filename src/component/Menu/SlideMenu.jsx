import React from "react"
import home from "../../img/home/home.jpg"
import home2 from "../../img/home/home2.png"
import Carousel from "react-bootstrap/esm/Carousel"

export default function SlideMenu() {
  return (

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
  )
}
