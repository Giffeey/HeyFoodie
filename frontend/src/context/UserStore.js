import { observable, action, computed } from "mobx"

export class UserStore {
  @observable user = null
  @observable customer = null

  @action setUser(data) {
    this.user = data
  }

  @action async signOut() {
    window.FB.logout(function (response) {
      console.log("logout")
      document.location.reload()
    })

    // await window.FB.logout()
    // console.log('logout')
    // window.location.reload()
  }
}
