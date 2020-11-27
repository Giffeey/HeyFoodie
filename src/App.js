import React, { useContext, useState } from "react"
import { Router, navigate } from "@reach/router"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { FacebookProvider, Initialize, Profile } from "react-facebook"

import MenuList from "./page/MenuList"
import MainLayout from "./component/MainLayout"
import DetailMenu from "./page/HistoryPage"
import PaymentPage from "./page/PaymentPage"
import QueuePage from "./page/QueuePage"
import HistoryPage from "./page/HistoryPage"
import { storesContext } from "./context"
export default function App(props) {
  const { userStore } = useContext(storesContext)
  const [isUpdated, setIsUpdated] = useState(true)

  const storeProfile = async (data) => {
    if (data) {
      await userStore.setUser(data)
      setIsUpdated(false)
    }
    setIsUpdated(false)
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
                          if (!isUpdated) {
                            return (
                              <>
                                <Router>
                                  <MainLayout path="/" component={MenuList} />
                                  <MainLayout
                                    path="/menu"
                                    component={MenuList}
                                  />
                                  <MainLayout
                                    path="/historypage"
                                    component={HistoryPage}
                                  />
                                  <MainLayout
                                    path="/paymentpage"
                                    component={PaymentPage}
                                  />
                                  <MainLayout
                                    path="/queuepage"
                                    component={QueuePage}
                                  />
                                </Router>
                              </>
                            )
                          } else {
                            return <></>
                          }
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
