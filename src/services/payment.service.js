import http from "../http-common"

class paymentDataService{
    getAll() {
        return http.get("/payment");
    }

    get(id) {
        return http.get(`/payment/${id}`);
    }

    create(data) {
        return http.post("/payment/", data);
    }

    update(id, data) {
        return http.put(`/payment/${id}`, data);
    }

    delete(id) {
        return http.delete(`/payment/${id}`);
    }
}
export default new paymentDataService();