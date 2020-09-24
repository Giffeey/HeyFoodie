import { observable, action, computed } from "mobx"

export class SalesizeStore {
  @observable salesize = []

  @computed get currentSalesize() {
    return this.salesize
  }

  @action setSalesize(data) {
    this.salesize = data
  }
}
