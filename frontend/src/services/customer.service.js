import http from "../http-common"

class customerDataService{
    getAll() {
        return http.get("/api/customer");
    }

    get(id) {
        return http.get(`/api/customer/${id}`);
    }

    create(data) {
        return http.post("/customer/", data);
    }

    update(id, data) {
        return http.put(`/customer/${id}`, data);
    }
}
export default new customerDataService();