import React from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import Button from "react-bootstrap/Button"

export default function HistoryPage() {
  return (
    <CommonCard>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order ID</th>
                <th scope="col">วันที่</th>
                <th scope="col">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 p-0 text-center">
          <Button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            ย้อนกลับ
          </Button>
        </div>
      </div>
    </CommonCard>
  )
}
