import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./ViewOrder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Btn, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import webSocketService from "../../../webSocketService";
const cx = className.bind(style);

function ViewOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/orderdetail/${id}`)
      .then(({ data }) => {
        setOrderInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleEventUpdateOrder = (orderId) => {
    if (orderInfo.status !== "đã hủy") {
      Swal.fire({
        title: "Bạn chắc chắn?",
        text: "Bạn sẽ không thể hoàn tác hành động này!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đúng, hủy nó!",
      }).then((result) => {
        if (result.isConfirmed) {
          const payload = {
            ...orderInfo,
            status:
              orderInfo.status === "đang xử lý" ? "đã hủy" : "đang xử lý",
          };
          axiosClient
            .put(`/cancelorder/${orderId}`, payload)
            .then(({ data }) => {
              webSocketService.send('/app/updateOrder', data)
              Swal.fire({
                title: "Đơn hàng của bạn đã được hủy!",
                icon: "success",
              });
              navigate("/order");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      navigate(`/checkout?from=order&id=${orderId}`);
    }
  };

  return (
    <div className={cx("main-container")}>
      <div className={cx("order-detail")}>
        <div className={cx("heading")}>
          <h1>Chi Tiết Đơn Hàng</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        {!loading && (
          <div className={cx("box-container")}>
            <div className={cx("box")}>
              <div className={cx("col")}>
                <p className={cx("date")}> {orderInfo.date} </p>
                <img src={orderInfo.imageUrl} alt="product" />
                <h3 className={cx("nameProduct")}>{orderInfo.productName}</h3>
                <div className={cx("flex")}>
                  <p className={cx("price")}>giá: {orderInfo.price}VNĐ</p>
                  <p className={cx("quantity")}>
                    số lượng: {orderInfo.quantity}{" "}
                  </p>
                </div>
                <p className={cx("grand-total")}>
                  {" "}
                  tổng cộng: {orderInfo.price * orderInfo.quantity}VNĐ
                </p>
              </div>
              <div className={cx("col")}>
                <h3 className={cx("title")}> thông tin nhận hàng </h3>
                <p className={cx("user")}>
                  <FontAwesomeIcon icon={faUser} className={cx("icon")} />
                  {orderInfo.userName}
                </p>
                <p className={cx("user")}>
                  <FontAwesomeIcon icon={faPhone} className={cx("icon")} />
                  {orderInfo.phoneNumber}
                </p>
                <p className={cx("user")}>
                  <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
                  {orderInfo.email}
                </p>
                <p className={cx("user")}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={cx("icon")}
                  />
                  {orderInfo.address}
                </p>
                <p
                  className={cx("status", `${orderInfo.status == "đã giao" ? "delivered" : (orderInfo.status == "đã hủy" ? "canceled" : "")}`)}
                >
                  {orderInfo.status}
                </p>
                {orderInfo.status?.toLowerCase() === "đã giao" ? null : (
                  <Btn
                    value={orderInfo.status === "đã hủy" ? "đặt lại" : "hủy"}
                    onclick={() => handleEventUpdateOrder(orderInfo.id)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOrder;
