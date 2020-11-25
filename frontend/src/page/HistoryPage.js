import React, { useContext, useEffect, useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import Button from "react-bootstrap/Button"
import historyDataService from "../services/history.service"
import { storesContext } from "../context"
export default function HistoryPage() {
  const [Histories, setHistories] = useState([])
  const { userStore } = useContext(storesContext)

  useEffect(() => {
    const response = historyDataService.getAll(userStore.customer.id)
  }, [])

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
                <th scope="col">วันที่และเวลา</th>
                <th scope="col">สถานะคำสั่งซื้อ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
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
