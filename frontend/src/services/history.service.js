import http from "../http-common"

class historyDataService{
    getAll() {
        return http.get("/history");
    }

    get(id) {
        return http.get(`/history/${id}`);
    }
}
export default new historyDataService();