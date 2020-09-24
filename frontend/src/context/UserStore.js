import { observable, action, computed } from "mobx"

export class UserStore {
    @observable user = {}

    @action setUser(data) {
        this.user = data
    }
    @action async signOut() {
        await window.FB.logout()
        window.location.reload()
    }
}
