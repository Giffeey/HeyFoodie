import { observable, action, computed } from "mobx"
import customerDataService from "../services/customer.service"
export class UserStore {
  @observable user = null
  @observable customer = null

  @action async setUser(data) {
    const response = await customerDataService.create(data)
    const customerResponse = response.data[0]
    this.user = data
    this.customer = { id: customerResponse.pk, ...customerResponse.fields }
  }

  @action async signOut() {
    window.FB.logout(function (response) {
      console.log("logout")
      document.location.href = "/"
    })

    // await window.FB.logout()
    // console.log('logout')
    // window.location.reload()
  }
}
