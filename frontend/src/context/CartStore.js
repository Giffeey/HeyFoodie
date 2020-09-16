import { observable, action, computed } from "mobx"

export class CartStore {
  @observable cart = []

  @computed get currentCart() {
    return this.cart
  }

  @action setCart(data) {
    this.cart = data
  }
}
