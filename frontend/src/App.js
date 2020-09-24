import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { FacebookProvider, Initialize, Profile } from 'react-facebook';

import MenuList from "./page/MenuList"
import MainLayout from "./component/MainLayout"
import DetailMenu from "./page/DetailMenu"
import PaymentCash from "./page/PaymentCash"
import { storesContext } from "./context"


export default function App(props) {
  const { userStore } = useContext(storesContext)

  const storeProfile = (data) => {
    if (data) {
      userStore.setUser(data)
      console.log(userStore.user.email)
    }
  }
  return (
    <Router>
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
                              <MainLayout>
                                <Switch>
                                  <Route exact path={["/", "/menu"]} component={MenuList} />
                                  <Route exact path={"/detailmenu"} component={DetailMenu} />
                                  <Route exact path={"/paymentcash"} component={PaymentCash} />
                                </Switch>
                              </MainLayout>
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
    </Router>
  )
}
