import React, { useContext } from "react"
import { Router, navigate } from "@reach/router"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { FacebookProvider, Initialize, Profile } from "react-facebook"

import MenuList from "./page/MenuList"
import MainLayout from "./component/MainLayout"
import DetailMenu from "./page/DetailMenu"
import PaymentPage from "./page/PaymentPage"
import { storesContext } from "./context"
export default function App(props) {
  const { userStore } = useContext(storesContext)

  const storeProfile = (data) => {
    console.log(data)

    if (data) {
      userStore.setUser(data)
    }
  }
  return (
    <div>
      <FacebookProvider appId="319223145838224">
        <Initialize>
          {({ isReady }) => {
            if (isReady) {
              return (
                <>
                  <FacebookProvider appId="319223145838224">
                    <Profile>
                      {({ loading, profile }) => {
                        if (!loading) {
                          storeProfile(profile)
                          return (
                            <>
                              <Router>
                                <MainLayout path="/" component={MenuList} />
                                <MainLayout path="/menu" component={MenuList} />
                                <MainLayout
                                  path="/detailmenu"
                                  component={DetailMenu}
                                />
                                <MainLayout
                                  path="/paymentpage"
                                  component={PaymentPage}
                                />
                              </Router>
                            </>
                          )
                        } else {
                          return <></>
                        }
                      }}
                    </Profile>
                  </FacebookProvider>
                </>
              )
            } else {
              return <></>
            }
          }}
        </Initialize>
      </FacebookProvider>
    </div>
  )
}
