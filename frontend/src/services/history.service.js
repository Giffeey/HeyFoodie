import http from "../http-common"

class historyDataService {
  getAll(customer_id) {
    return http.get(`/history?customer=${customer_id}`)
  }

  get(id) {
    return http.get(`/history/${id}`)
  }
}
export default new historyDataService()
