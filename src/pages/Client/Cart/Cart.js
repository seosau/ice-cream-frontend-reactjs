import { useState, useEffect, useCallback, memo } from "react";
import className from "classnames/bind";
import style from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Alert, Btn, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
const cx = className.bind(style);

function Cart() {
  const navigate = useNavigate();
  const { setCartIds, setQuantityCart, userToken, currentUser } = useStateContext();
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getProductsInCart = async () => {
    setLoading(true);
    await axiosClient
      .get("/cart/" + currentUser.id)
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
        setCartIds(data);
      })
      .catch((error) => console.log(error));
  };
  const handleTotalPrice = useCallback(() => {
    const total = products.reduce((accumulator, product) => {
      return accumulator + product.products.price * product.quantity;
    }, 0);
    setGrandTotal(total.toFixed(1));
  }, [products, setGrandTotal]);
  // const handleQuantity = (number, id) => {
  //   setProducts((prevProducts) => {
  //     return prevProducts.map((product) => {
  //       if (product.product_id === id) {
  //         if (number === 1 || number === -1) {
  //           return {
  //             ...product,
  //             quantity:
  //               product.quantity + number <= 0
  //                 ? 1
  //                 : product.quantity + number > product.stock
  //                 ? product.stock
  //                 : product.quantity + number,
  //           };
  //         }
  //         return {
  //           ...product,
  //           quantity:
  //             number > 0 && number <= product.stock ? number : product.quantity,
  //         };
  //       }
  //       return product;
  //     });
  //   });
  // };
  const handleQuantity = (number, id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                number === 1
                  ? Math.min(product.quantity + 1, product.products.stock)
                  : number === -1
                  ? Math.max(product.quantity - 1, 1)
                  : Math.min(Math.max(number, 1), product.products.stock),
            }
          : product
      )
    );
  };
  const handleUpdateCart = async (cart_id, quantity) => {
    await axiosClient
      .put(`/cart/${cart_id}/${currentUser.id}`, { quantity: quantity })
      .then(({ data }) => {
        Alert("success", "Cập nhật số lượng thành công");
        setProducts(data);
        setQuantityCart(data.length);
        setCartIds(data);
      })
      .catch((error) => console.log(error));
  };
  const handleButtonDelete = async (cart_id, product_id) => {
    Swal.fire({
      title: "Bạn chắc chắn?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đúng, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/cart/${cart_id}/${currentUser.id}`)
          .then(({ data }) => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Đã xóa sản phẩm thành công",
              icon: "success",
            });
            setProducts((prevProducts) =>
              prevProducts.filter(
                (product) => product.id !== cart_id
              )
            );
            setCartIds(data);
            setQuantityCart(data.length);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  useEffect(() => {
    if (currentUser) {
      getProductsInCart();
    } else {
      Alert("warning", "Vui lòng đăng nhập để thực hiện chức năng này");
      navigate("/login");
    }
  }, [currentUser]);
  useEffect(() => {
    handleTotalPrice();
  }, [handleTotalPrice]);

  return (
    <div className={cx("main-container")}>
      <div className={cx("products")}>
        <div className={cx("heading")}>
          <h1>Giỏ hàng của tôi</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        <div className={cx("box-container")}>
          {!loading && (
            <>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className={cx("box")}>
                    <img src={product.products.image} alt="product" />
                    <div className={cx("content")}>
                      <img
                        alt=""
                        src={require("../../../assets/img/shape-19.png")}
                        className={cx("sharp")}
                      />
                      <h3>{product.products.name}</h3>
                      <div className={cx("flex-btn")}>
                        <p className={cx("price")}>Giá: {product.products.price}VNĐ</p>
                        <div className={cx("quantity")}>
                          <button
                            className={cx("btn-quantity", "quanity-item")}
                            onClick={() =>
                              handleQuantity(-1, product.id)
                            }
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
                                product.id
                              )
                            }
                          />
                          <button
                            className={cx("btn-quantity")}
                            onClick={() =>
                              handleQuantity(1, product.id)
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} color={"#da6285"} />
                          </button>
                        </div>

                        <Btn
                          onclick={() =>
                            handleUpdateCart(product.id, product.quantity)
                          }
                          style={{
                            width: "fit-content",
                          }}
                          value={<FontAwesomeIcon icon={faEdit} />}
                        />
                      </div>
                      <div className={cx("flex-btn")}>
                        <p className={cx("sub-total")}>
                          Tổng:
                          <span>
                            {" "}
                            {(product.products.price * product.quantity).toFixed(1)}VNĐ
                          </span>
                        </p>
                        <Btn
                          onclick={() =>
                            handleButtonDelete(
                              product.id,
                              product.products.id
                            )
                          }
                          style={{
                            width: "fit-content",
                          }}
                          value="xóa"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={cx("empty")}>
                  <p>không tìm thấy sản phẩm nào!</p>
                </div>
              )}
            </>
          )}
        </div>

        {grandTotal > 0 ? (
          <div className={cx("cart-total")}>
            <p>
              tổng tiền phải trả: <span>{grandTotal}VNĐ</span>
            </p>
            <Btn
              href="/checkout"
              style={{
                width: "fit-content",
              }}
              value="Thanh toán"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(Cart);
