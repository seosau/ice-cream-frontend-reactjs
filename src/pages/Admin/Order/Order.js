import { useState, useEffect } from "react";
import className from "classnames/bind";
import style from "./Order.module.scss";
import Swal from "sweetalert2";
import { Btn, Alert, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
const cx = className.bind(style);
function Order() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({});
  const currentURL = window.location.search;
  const currentPath = window.location.pathname;
  const isSort = currentURL.includes("status");
  const getOrderData = () => {
    const url = currentPath.includes("seller")
      ? "/seller/order"
      : "/admin/order";
    setLoading(true);
    var payload = {};
    if (url.includes("order")) {
      payload = { ...params };
    }
    axiosClient
      .get(url)
      .then(({ data }) => {
        setOrderData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsFromCurrentUrl = () => {
    if (isSort === true) {
      const searchParams = new URLSearchParams(currentURL);
      const status = searchParams.get("status")?.toLowerCase();
      const payment_status = searchParams.get("payment_status")?.toLowerCase();
      setParams({
        status: status,
        payment_status: payment_status,
      });
      onGetSortValue(status, payment_status);
    } else {
      getOrderData();
    }
  };
  const handleUpdatePaymentStatus = (orderId, index) => {
    if (
      paymentStatus.paymentStatus.toLowerCase() === "hoàn thành" &&
      orderId === paymentStatus.orderId
    ) {
      const updateOrderData = orderData.map((prevOrderInfo) => {
        if (prevOrderInfo.id === orderId) {
          return {
            ...prevOrderInfo,
            paymentStatus: paymentStatus.paymentStatus,
            status:
              paymentStatus.paymentStatus.toLowerCase() === "hoàn thành"
                ? "đã giao"
                : "đang xử lý",
          };
        }
        return prevOrderInfo;
      });
      axiosClient
        .put(`/seller/order/${orderId}`, updateOrderData[index])
        .then(({ data }) => {
          getOrderData();
          Alert(
            "success",
            "Đã cập nhật!",
            "Sản phẩm sẽ được sớm giao đến khách hàng!"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể khôi phục lại.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(
            currentPath.includes("seller")
              ? `/seller/order/${orderId}`
              : `/admin/order/${orderId}`
          )
          .then(({ data }) => {
            // getProductsFromCurrentUrl();
            setOrderData((prevOrderData) =>
              prevOrderData.filter((orderInfo) => orderInfo.id !== orderId)
            );
            Swal.fire({
              icon: "success",
              title: "Đã xóa!",
              text: "Đơn hàng này đã được xóa",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const onGetSortValue = (status, paymentStatus) => {
    setLoading(true);
    setParams({ status, paymentStatus });
    axiosClient
      .get(currentPath.includes("seller") ? "/seller/order" : "/admin/order", {
        params: {
          status: status,
          paymentStatus: paymentStatus,
        },
      })
      .then(({ data }) => {
        setOrderData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orderData.map((order, i) =>
      order.id === id ? { ...order, paymentStatus: newStatus } : order
    );
    setOrderData(updatedOrders);
    setPaymentStatus({
      orderId: id,
      paymentStatus: newStatus
    })
  };

  useEffect(() => {
    getProductsFromCurrentUrl();
  }, [currentPath]);
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Tổng đơn đặt hàng</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      <div className={cx("box-container")}>
        {!loading && (
          <>
            {orderData.length > 0 ? (
              orderData.map((orderInfo, index) => (
                <div className={cx("box")} key={index}>
                  <div
                    className={cx("status")}
                    style={{
                      color:
                        orderInfo.status.toLowerCase() === "Đã hủy".toLowerCase()
                          ? "red"
                          : orderInfo.status.toLowerCase() === "Đang xử lý".toLowerCase()
                            ? "orange"
                            : "green",
                    }}
                  >
                    {orderInfo.status}
                  </div>
                  <div className={cx("details")}>
                    <p>
                      Người đặt:
                      <span>
                        {" " + orderInfo.userName}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      Tên sản phẩm:
                      <span>
                        {" " + orderInfo.productName}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      Số lượng:
                      <span>
                        {" " + orderInfo.quantity}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      Ngày đặt:
                      <span>
                        {" " + orderInfo.date}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      SDT:
                      <span>
                        {" " + orderInfo.phoneNumber}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      Email:
                      <span>
                        {" " + orderInfo.email}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      tổng tiền:
                      <span>
                        {" " + orderInfo.price * orderInfo.quantity}VNĐ
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      phương thức thanh toán:
                      <span>
                        {" " + orderInfo.paymentMethod}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    <p>
                      địa chỉ:
                      <span>
                        {" " + orderInfo.address}
                        {/*fetch from db*/}
                      </span>
                    </p>
                    {orderInfo.status.toLowerCase() === "Đã hủy".toLowerCase() ? null : (
                      <select
                        className={cx("box")}
                        name="update_payment"
                        value={orderInfo.paymentStatus}
                        onChange={(e) => handleStatusChange(orderInfo.id, e.target.value)}
                      >
                        <option value="hoàn thành">Hoàn thành</option>
                        <option value="đang chờ">Đang chờ</option>
                      </select>
                    )}
                    <div className={cx("flex-btn")}>
                      <Btn
                        value={"Cập nhật thanh toán"}
                        onclick={() =>
                          handleUpdatePaymentStatus(orderInfo.id, index)
                        }
                      />
                      <Btn
                        value={"Xóa đơn"}
                        onclick={() => handleDeleteOrder(orderInfo.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("empty")}>
                <p>Không có đơn đặt hàng nào.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Order;
