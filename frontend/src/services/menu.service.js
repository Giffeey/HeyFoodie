import http from "../http-common"

class menuDataService{
    getAll() {
        return http.get("/menu");
    }

    get(id) {
        return http.get(`/menu/${id}`);
    }

    create(data) {
        return http.post("/menu", data);
    }

    update(id, data) {
        return http.put(`/menu/${id}`, data);
    }

    delete(id) {
        return http.delete(`/menu/${id}`);
    }

    findByTitle(title) {
        return http.get(`/menu?titile=${title}`);
    }
}
export default new menuDataService();