import React, { useContext, useEffect, useState } from "react"
import CommonCard from "../component/Common/CommonCard"
import { navigate } from "@reach/router"
import Button from "react-bootstrap/Button"
import historyDataService from "../services/history.service"
import { storesContext } from "../context"
import dayjs from "dayjs"
export default function HistoryPage() {
  const [histories, setHistories] = useState([])
  const { userStore } = useContext(storesContext)

  const fetchHistory = async () => {
    if (userStore.customer) {
      const response = await historyDataService.getAll(userStore.customer.id)
      setHistories(response.data)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <CommonCard>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">วันที่และเวลา</th>
                <th scope="col">สถานะคำสั่งซื้อ</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((item) => (
                <tr>
                  <td>{item.order_id}</td>
                  <td>{dayjs(item.date).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>{item.order_status}</td>
                </tr>
              ))}
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
