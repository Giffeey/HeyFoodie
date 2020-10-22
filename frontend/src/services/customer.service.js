import http from "../http-common"

class orderDataService{
    getAll() {
        return http.get("/customer");
    }

    get(id) {
        return http.get(`/customer/${id}`);
    }

    create(data) {
        return http.post("/customer", data);
    }

    update(id, data) {
        return http.put(`/customer/${id}`, data);
    }

    delete(id) {
        return http.delete(`/customer/${id}`);
    }

    findByTitle(title) {
        return http.get(`/customer?titile=${title}`);
    }
}
export default new customerDataService();