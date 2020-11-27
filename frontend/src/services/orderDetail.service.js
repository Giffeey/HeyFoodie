import http from "../http-common"

class orderDetailDataService{
    getAll() {
        return http.get("/orderd");
    }

    get(id) {
        return http.get(`/orderd/${id}`);
    }

    create(data) {
        return http.post("/orderd/", data);
    }

    update(id, data) {
        return http.put(`/orderd/${id}`, data);
    }

    delete(id) {
        return http.delete(`/orderd/${id}`);
    }

}
export default new orderDetailDataService();