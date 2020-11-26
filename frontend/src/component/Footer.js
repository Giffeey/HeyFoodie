import React, { useContext, useEffect, useMemo, useState } from "react"
import place from "../img/icon/place.png"
import line from "../img/icon/line.png"
import fb from "../img/icon/fb.png"
import ig from "../img/icon/ig.png"
import mail_outline from "../img/icon/mail_outline.png"
import twitter from "../img/icon/twitter.png"
import phone from "../img/icon/phone.png"
import { storesContext } from "../context"

export default function Footer(props) {
  const { salesizeStore } = useContext(storesContext)
  const [isPrefetch, setisPrefetch] = useState(true)
  const fetchMenus = async () => {
    await salesizeStore.fetchStore()
    setisPrefetch(false)
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  return (
    <>
      {!isPrefetch && (
        <div>
          <footer className="footer-foot">
            <div className="container-fluid text-center text-md-left">
              <div className="row">
                <div className="col-md-5 mt-md-0 mt-3">
                  <h5 className="text-store">
                    {salesizeStore.store?.storename}
                  </h5>
                  <p>{salesizeStore.store?.detail}</p>
                </div>

                <div className="col-md-3 mb-md-0 mb-3">
                  <ul className="list-unstyled place">
                    <li>
                      <img className="img-footer" src={place} alt="img-place" />
                      ที่ตั้งร้าน
                    </li>
                  </ul>

                  <p>{salesizeStore.store?.address}</p>
                </div>

                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase">ติดต่อร้าน</h5>
                  <ul className="list-unstyled">
                    <li>
                      <img
                        className="img-footer"
                        src={phone}
                        alt="phone-icon"
                      />
                      {salesizeStore.store?.phone}
                    </li>
                    <li>
                      <img
                        className="img-footer"
                        src={mail_outline}
                        alt="mail-icon"
                      />
                      {salesizeStore.store?.email}
                    </li>
                    <li>
                      <img className="img-footer" src={line} alt="line-icon" />
                      {salesizeStore.store?.lineac}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="footer-hr" />
            <div className="footer-copyright text-left">© HeyFoodie</div>
            <div className="footer text-right">
              <img className="img-footer" src={fb} alt="fb-icon" />
              <img className="img-footer" src={twitter} alt="twitter-icon" />
              <img className="img-footer" src={ig} alt="ig-icon" />
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
