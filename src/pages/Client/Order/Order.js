import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./Order.module.scss";
import Swal from "sweetalert2";
import { Btn, Loader, Alert } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);

function Order() {
  const navigate = useNavigate();
  const { userToken } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const handleEventUpdateOrder = (orderId, index) => {
    if (orderData[index].status === "in progress") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const updateOrderData = orderData.map((prevOrderInfo) => {
            if (prevOrderInfo.id === orderId) {
              return {
                ...prevOrderInfo,
                status:
                  prevOrderInfo.status === "canceled"
                    ? "in progress"
                    : "canceled",
              };
            }
            return prevOrderInfo;
          });
          setOrderData(updateOrderData);
          axiosClient
            .put(`/order/${orderId}`, updateOrderData[index])
            .then(({ data }) => {
              console.log(data);
              Swal.fire({
                title: "Canceled!",
                text: "Your order have been canceled!",
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else if (orderData[index].status === "canceled") {
      navigate("/checkout");
    }
  };
  const getOrderData = () => {
    setLoading(true);
    axiosClient
      .get("/order")
      .then(({ data }) => {
        setOrderData(data.orderList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userToken) {
      getOrderData();
    } else {
      Alert("warning", "Please login to have more experience");
      navigate('/login')
    }
  }, [userToken]);
  return (
    <div className={cx("main-container")}>
      <div className={cx("orders")}>
        <div className={cx("heading")}>
          <h1>My Orders</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        <div className={cx("box-container")}>
          {!loading && (
            <>
              {orderData?.length > 0 ? (
                orderData.map((orderInfo, index) => (
                  <div className={cx("box")} key={orderInfo.id}>
                    <Link
                      to={`/order/vieworder/${orderInfo.id}`}
                      className={cx("view-order")}
                    >
                      <img src={orderInfo.image_url} alt="ordered" />
                      <p className={cx("date")}>{orderInfo.date}</p>
                    </Link>
                    <div className={cx("content")}>
                      <img
                        alt=""
                        src={require("../../../assets/img/shape-19.png")}
                        className={cx("sharp")}
                      />
                      <div className={cx("")}>
                        <h3 className={cx("name")}>{orderInfo.product_name}</h3>
                        <p className={cx("price")}>Price: {orderInfo.price}$</p>
                        <p
                          className={cx(
                            "status",
                            `${orderInfo.status.toLowerCase()}`
                          )}
                        >
                          {orderInfo.status}
                        </p>
                      </div>
                      <div className={cx("flex-btn")}>
                        <Btn
                          href={`/order/vieworder/${orderInfo.id}`}
                          style={{
                            width: "fit-content",
                          }}
                          value="view order"
                        />
                        {orderInfo.status.toLowerCase() ===
                        "delivered" ? null : (
                          <Btn
                            href={
                              orderInfo.status === "canceled"
                                ? `?from=order&id=${orderInfo.id}`
                                : ""
                            }
                            style={{
                              width: "fit-content",
                            }}
                            value={
                              orderInfo.status === "canceled"
                                ? "order again"
                                : "cancel"
                            }
                            onclick={() =>
                              handleEventUpdateOrder(orderInfo.id, index)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={cx("empty")}>
                  <p>no product was found!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
