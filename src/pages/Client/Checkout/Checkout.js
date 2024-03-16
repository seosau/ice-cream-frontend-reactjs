import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./Checkout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Alert, Btn, Loader } from "../../../components";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../axiosClient/axios";
const cx = className.bind(style);

export default function Checkout() {
  const currentURL = window.location.search;
  const searchParams = new URLSearchParams(currentURL);
  const from = searchParams.get("from");
  const id = Number(searchParams.get("id"));
  const navigate = useNavigate();
  const { currentUser, setCartIds } = useStateContext();
  const [orderData, setOrderData] = useState({
    user_name: "",
    phone_number: "",
    email: "",
    payment_method: "cash on delivery",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const getProductsInCart = () => {
    setLoading(true);
    axiosClient
      .get("/cart")
      .then(({ data }) => {
        setProducts(data.cartList);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const handleTotalPrice = () => {
    const total = products.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);
    setGrandTotal(total.toFixed(1));
  };
  const handleQuantity = (number, id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === id
          ? {
              ...product,
              quantity:
                number === 1
                  ? Math.min(product.quantity + 1, product.stock)
                  : number === -1
                  ? Math.max(product.quantity - 1, 1)
                  : Math.min(Math.max(number, 1), product.stock),
            }
          : product
      )
    );
  };
  const handleSubmitOrder = () => {
    if (id && from === "order") {
      const payload = {
        ...orderData,
        ...products[0],
        user_id: currentUser.id,
        status: "in progress",
      };
      axiosClient
        .put(`/order/${id}`, payload)
        .then(({ data }) => {
          Alert("success", "Order again successfully");
          navigate("/order");
        })
        .catch((error) => {
          if (error.response) {
            setErrors(error.response.data.errors);
          }
        });
    } else {
      const payload = { ...orderData, user_id: currentUser.id, products };
      axiosClient
        .post("/order", payload)
        .then(({ data }) => {
          setCartIds([]);
          Alert("success", "Order successfully");
          navigate("/order");
        })
        .catch((error) => {
          if (error.response) {
            setErrors(error.response.data.errors);
          }
        });
    }
  };
  const handleGetDataFromCurrentUrl = () => {
    if (from === "order") {
      setLoading(true);
      axiosClient
        .get(`/order/${id}`)
        .then(({ data }) => {
          setProducts(data.data);
          setOrderData(...data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (from === "menu") {
      setLoading(true);
      axiosClient
        .get(`/menu/${id}`)
        .then(({ data }) => {
          setProducts([{ ...data.data[0], quantity: 1, product_id: id }]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      handleGetDataFromCurrentUrl();
    } else {
      getProductsInCart();
    }
  }, []);
  useEffect(() => {
    handleTotalPrice();
  }, [products]);
  return (
    <div className={cx("main-container")}>
      <div className={cx("checkout")}>
        <div className={cx("heading")}>
          <h1>checkout summary</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        <div className={cx("summary")}>
          <h3>My Bag</h3>
          <div className={cx("box-container")}>
            {products.map((product) => (
              <div className={cx("box")} key={product.product_id}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className={cx("")}
                />
                <div className={cx("product-info")}>
                  <h3 className={cx("name")}>{product.name}</h3>
                  <span className={cx("price")}>{product.price}$ X</span>
                  <div className={cx("quantity")}>
                    <button
                      className={cx("btn-quantity", "quanity-item")}
                      onClick={() => handleQuantity(-1, product.product_id)}
                    >
                      <FontAwesomeIcon icon={faMinus} color={"#da6285"} />
                    </button>
                    <input
                      className={cx("quantity-input")}
                      type="text"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantity(
                          Number(e.target.value),
                          product.product_id
                        )
                      }
                    />
                    <button
                      className={cx("btn-quantity")}
                      onClick={() => handleQuantity(1, product.product_id)}
                    >
                      <FontAwesomeIcon icon={faPlus} color={"#da6285"} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={cx("total")}>
            <span>Total amount payable: {grandTotal}$</span>
          </div>
        </div>
        <div className={cx("form-container")}>
          <form className={cx("register")}>
            <h3 className={cx("")}>billing details</h3>
            <div className={cx("input-field")}>
              <p className={cx("")}>
                your name <span className={cx("")}>*</span>
              </p>
              <input
                className={cx("box")}
                type="text"
                name="name"
                placeholder="enter your name..."
                value={orderData.user_name}
                onChange={(e) => {
                  if (errors?.user_name) {
                    setErrors({ ...errors, user_name: "" });
                  }
                  setOrderData({
                    ...orderData,
                    user_name: e.target.value,
                  });
                }}
              />
              {errors?.user_name ? (
                <div className={cx("error")}>{errors.user_name}</div>
              ) : null}
            </div>
            <div className={cx("input-field")}>
              <p className={cx("")}>
                your phone number <span className={cx("")}>*</span>
              </p>
              <input
                className={cx("box")}
                type="tel"
                name="number"
                placeholder="enter your number..."
                maxLength={50}
                value={orderData.phone_number}
                onChange={(e) => {
                  if (errors?.phone_number) {
                    setErrors({ ...errors, phone_number: "" });
                  }
                  setOrderData({
                    ...orderData,
                    phone_number: e.target.value,
                  });
                }}
              />
              {errors?.phone_number ? (
                <div className={cx("error")}>{errors.phone_number}</div>
              ) : null}
            </div>
            <div className={cx("input-field")}>
              <p className={cx("")}>
                your email <span className={cx("")}>*</span>
              </p>
              <input
                className={cx("box")}
                type="email"
                name="email"
                placeholder="enter your email..."
                onChange={(e) => {
                  if (errors?.email) {
                    setErrors({ ...errors, email: "" });
                  }
                  setOrderData({
                    ...orderData,
                    email: e.target.value,
                  });
                }}
                value={orderData.email}
              />
              {errors?.email ? (
                <div className={cx("error")}>{errors.email}</div>
              ) : null}
              <div className={cx("input-field")}>
                <p className={cx("")}>
                  payment method <span className={cx("")}>*</span>
                </p>
                <select
                  name="method"
                  className={cx("box")}
                  value={orderData.payment_method}
                  onChange={(e) => {
                    setOrderData({
                      ...orderData,
                      payment_method: e.target.value,
                    });
                  }}
                >
                  <option value="cash on delivery">cash on delivery</option>
                  <option value="credit or debit card">
                    credit or debit card
                  </option>
                  <option value="net banking">net banking</option>
                </select>
              </div>
            </div>

            <div className={cx("input-field")}>
              <p className={cx("")}>
                your address <span className={cx("")}>*</span>
              </p>
              <input
                className={cx("box")}
                type="text"
                name="country"
                placeholder="enter your address..."
                maxLength={50}
                value={orderData.address}
                onChange={(e) => {
                  if (errors?.address) {
                    setErrors({ ...errors, address: "" });
                  }
                  setOrderData({
                    ...orderData,
                    address: e.target.value,
                  });
                }}
              />
              {errors?.address ? (
                <div className={cx("error")}>{errors.address}</div>
              ) : null}
            </div>
            <div className={cx("flex-btn")}>
              <Btn
                value="place order"
                style={{ width: "40%" }}
                onclick={handleSubmitOrder}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
