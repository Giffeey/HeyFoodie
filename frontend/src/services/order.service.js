import http from "../http-common"

class orderDataService{
    getAll() {
        return http.get("/order");
    }

    get(id) {
        return http.get(`/order/${id}`);
    }

    create(data) {
        return http.post("/order/", data);
    }

    update(id, data) {
        return http.put(`/order/${id}`, data);
    }

    delete(id) {
        return http.delete(`/order/${id}`);
    }

    findByCustomerId(id) {
        return http.get(`/order?customer_id=${id}`);
    }
}
export default new orderDataService();