import React from "react"
import place from "../img/icon/place.png"
import line from "../img/icon/line.png"
import fb from "../img/icon/fb.png"
import ig from "../img/icon/ig.png"
import mail_outline from "../img/icon/mail_outline.png"
import twitter from "../img/icon/twitter.png"
import phone from "../img/icon/phone.png"

export default function Footer(props) {
  return (
    <div>
      <footer className="footer-foot">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-5 mt-md-0 mt-3">
                <h5 className="text-store">{props.store?.storename}</h5>
                <p>{props.store?.detail}</p>
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <ul className="list-unstyled place">
                  <li>
                    <img className="img-footer" src={place} alt="img-place" />
                    ที่ตั้งร้าน
                  </li>
                </ul>

                <p>
                  437/87-88 Moo 9, Soi 6, Beach Road, Pattaya 20150 Thailand
                </p>
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">ติดต่อร้าน</h5>
                <ul className="list-unstyled">
                  <li>
                    <img className="img-footer" src={phone} alt="phone-icon" />
                    Phone: {props.owner?.phone}
                  </li>
                  <li>
                    <img
                      className="img-footer"
                      src={mail_outline}
                      alt="mail-icon"
                    />
                    E-mail: {props.owner?.email}
                  </li>
                  <li>
                    <img className="img-footer" src={line} alt="line-icon" />
                    Line: {props.owner?.phone}
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
  )
}
