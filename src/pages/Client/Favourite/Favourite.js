import { useEffect, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./Favourite.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Btn, Loader, Alert } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);

function Favourite() {
  const navigate = useNavigate();
  const { currentUser, setCartIds, cartIds, userToken } = useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setWishListIds } = useStateContext();
  const getProductsInWishList = () => {
    setLoading(true);
    axiosClient
      .get("/wishlists/" + currentUser?.id)
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (currentUser) {
      getProductsInWishList();
    } else {
      Alert("warning", "Vui lòng đăng nhập để thực hiện chức năng này");
      navigate("/login");
    }
  }, [currentUser]);
  const handleButtonDelete = (id) => {
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
          .delete(`/wishlists/${id}/${currentUser.id}`)
          .then(({ data }) => {
            setWishListIds(data);
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== id)
            );
            Swal.fire({
              title: "Đã xóa!",
              text: "Đã xóa sản phẩm thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Có lỗi!",
              icon: "error",
            });
          });
      }
    });
  };
  const handleCheckProductInCart = (productId) => {
    const isCartInMenu = cartIds?.some((item) => {
      return item.productId === productId;
    });
    if (isCartInMenu) return true;
    return false;
  };
  const handleClickCart = (product) => {
    if (product.products.stock === 0) {
      Swal.fire({
        title: "Xin lỗi",
        text: "Sản phẩm tạm thời không còn",
        imageUrl: require("../../../assets/img/crying.png"),
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: "Custom image",
      });
      return;
    }
    if (handleCheckProductInCart(product.products.id)) {
      Alert("warning", "Sản phẩm đã có trong giỏ hàng!");
      return;
    }
    const payload = {
      userId: currentUser.id,
      quantity: 1,
      productId: product.products.id,
    };
    axiosClient
      .post("/cart", payload)
      .then(({ data }) => {
        Alert("success", "Thêm vào giỏ hàng thành công");
        setCartIds(data);
      })
      .catch((error) => {
        if (error.response) {
          Alert("warning", `${error.response.data.errors.id}`);
        }
      });
  };
  return (
    <div className={cx("main-container")}>
      <div className={cx("products")}>
        <div className={cx("heading")}>
          <h1>Danh sách yêu thích</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        <div className={cx("box-container")}>
          {!loading && (
            <>
              {products?.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className={cx("box")}>
                    <Link to={`/shop/view1product/${product.products.id}`}>
                      <img src={product.products.image} alt="product" />
                    </Link>
                    <div className={cx("content")}>
                      <img
                        alt=""
                        src={require("../../../assets/img/shape-19.png")}
                        className={cx("sharp")}
                      />
                      <h3>{product.products.name}</h3>
                      <p className={cx("price")}>Giá: {product.products.price}VNĐ</p>
                      <div className={cx("flex-btn")}>
                        <Btn
                          onclick={() => handleClickCart(product)}
                          style={{
                            width: "fit-content",
                          }}
                          value={
                            <>
                              {handleCheckProductInCart(product.products.id)
                                ? "Đã Trong Giỏ"
                                : "Thêm Vào Giỏ"}

                              <FontAwesomeIcon
                                icon={faCartShopping}
                                className={cx("detail-icon-style")}
                                color={
                                  handleCheckProductInCart(product.products.id)
                                    ? "#da6285"
                                    : "#808080"
                                }
                              />
                            </>
                          }
                        />
                      </div>
                      <div className={cx("flex-btn")}>
                        <Btn
                          onclick={() => handleButtonDelete(product.id)}
                          style={{
                            width: "50%",
                          }}
                          value={"Xóa"}
                        />
                        <Btn
                          href={`/checkout?from=menu&id=${product.products.id}`}
                          style={{
                            width: "50%",
                          }}
                          value="mua ngay"
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
      </div>
    </div>
  );
}

export default memo(Favourite);
