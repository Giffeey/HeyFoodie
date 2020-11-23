import http from "../http-common"

class storeDataService {
  get(id) {
    return http.get(`/store/${id}`)
  }
}
export default new storeDataService()
