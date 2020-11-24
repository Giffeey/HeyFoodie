import { observable, action, computed } from "mobx"
import storeDataService from "../services/store.service"

export class SalesizeStore {
  @observable store = {}

  @action seStore(data) {
    this.store = data
  }

  @action async fetchStore() {
    const response = await storeDataService.get(1)
    this.seStore(response.data)
  }
}
