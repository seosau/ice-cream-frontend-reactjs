import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import style from "./View1Product.module.scss";
import Swal from "sweetalert2";
import { Btn, Alert, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);
function View1Product() {
  let { state } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    currentUser,
    wishListIds,
    setWishListIds,
    cartIds,
    setCartIds,
    setQuantityCart,
  } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const getProducts = async (url = `/menu`) => {
    await axiosClient
      .get(url)
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductById = useCallback(
    async (id = null) => {
      let product_id = id ? id : productId;
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/menu/${product_id}`);
        setProduct(data.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [productId]
  );
  const fetchData = useCallback(async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (state) {
      setProduct(state);
      setLoading(false);
    } else {
      await getProductById();
    }
  }, [state, getProductById]);
  useEffect(() => {
    fetchData();
  }, [fetchData, getProductById]);
  useEffect(() => {
    getProducts();
  }, []);
  const handleCheckProductInWishList = (product_id) => {
    const isWishInMenu = wishListIds.some((item) => {
      return item.product_id === product_id;
    });
    if (isWishInMenu) return true;
    return false;
  };
  const handleCheckProductInCart = (product_id) => {
    const isCartInMenu = cartIds?.some((item) => {
      return item.product_id === product_id;
    });
    if (isCartInMenu) return true;
    return false;
  };
  const handleClickLike = (product) => {
    if (currentUser) {
      const payload = { ...product, user_id: currentUser.id };
      axiosClient
        .post("/wishlists", payload)
        .then(({ data }) => {
          setWishListIds(data.wishListIds);
          Alert("success", "Thêm vào yêu thích thành công");
        })
        .catch((error) => {
          if (error.response) {
            Alert("warning", `${error.response.data.errors.id}`);
          }
        });
    } else {
      Alert(
        "warning",
        "Bạn chưa đăng nhập",
        "Vui lòng đăng nhập để thực hiện chức năng này"
      );
      navigate("/login");
    }
  };
  const handleClickCart = (product) => {
    if (currentUser.id) {
      if (product.stock === 0) {
        Swal.fire({
          title: "Xin lỗi",
          text: "Sản phẩm này sẽ sớm được thêm vào",
          imageUrl: require("../../../assets/img/crying.png"),
          imageWidth: 80,
          imageHeight: 80,
          imageAlt: "Custom image",
        });
        return;
      }
      const payload = { ...product, user_id: currentUser.id, quantity: 1 };
      axiosClient
        .post("/cart", payload)
        .then(({ data }) => {
          setCartIds(data.cartListIds);
          setQuantityCart(data.quantity);
          Alert("success", "Thêm vào giỏ hàng thành công");
        })
        .catch((error) => {
          if (error.response) {
            Alert("warning", `${error.response.data.errors.id}`);
          }
        });
    } else {
      Alert(
        "warning",
        "Bạn chưa đăng nhập",
        "Vui lòng đăng nhập để thực hiện chức năng này"
      );
      navigate("/login");
    }
  };
  return (
    <div className={cx("main-container")}>
      <section className={cx("view-detail")}>
        <div className={cx("heading")}>
          <h1>Chi tiết sản phẩm</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        {!loading && (
          <div className={cx("main-box")}>
            <div className={cx("img-box")}>
              <img src={product.image_url} alt="" />
            </div>
            <div className={cx("detail-box")}>
              <span
                className={
                  product.stock > 0 ? cx("in-stock") : cx("out-of-stock")
                }
              >
                {product?.stock > 0 ? "Còn sản phẩm" : "Hết sản phẩm"}
              </span>
              <p className={cx("product-price")}>Giá: {product.price}VNĐ</p>
              <h2>{product.name}</h2>
              <p className={cx("description-text")}>{product.product_detail}</p>
              <div className={cx("detail-btn")}>
                <Btn
                  onclick={() => handleClickLike(product)}
                  // style={{
                  //   width: "35%",
                  // }}
                  value={
                    <>
                      {handleCheckProductInWishList(product.id)
                        ? "Đã Yêu Thích"
                        : "Yêu Thích"}

                      <FontAwesomeIcon
                        icon={faHeart}
                        className={cx("detail-icon-style")}
                        color={
                          handleCheckProductInWishList(product.id)
                            ? "#da6285"
                            : "#808080"
                        }
                      />
                    </>
                  }
                />
                <Btn
                  onclick={() => handleClickCart(product)}
                  // style={{
                  //   width: "35%",
                  // }}
                  value={
                    <>
                      {handleCheckProductInCart(product.id)
                        ? "Đã Trong Giỏ"
                        : "Thêm Vào Giỏ"}

                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className={cx("detail-icon-style")}
                        color={
                          handleCheckProductInCart(product.id)
                            ? "#da6285"
                            : "#808080"
                        }
                      />
                    </>
                  }
                />
              </div>
            </div>
          </div>
        )}
      </section>
      <div className={cx("products")}>
        <div className={cx("heading")}>
          <h1>Sản Phẩm Tương Tự</h1>
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
                products.map((product) => (
                  <div className={cx("box")} key={product.id}>
                    <Link
                      to={`/shop/view1product/${product.id}`}
                      className={cx("view-order")}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        getProductById(product.id);
                      }}
                    >
                      <img src={product.image_url} alt="product" />
                      <p className={cx("status")}>
                        {product.stock > 9
                          ? "Hết Sản Phẩm"
                          : product.stock > 0
                          ? `Nhanh, chỉ còn ${product.stock} sản phẩm`
                          : "Còn sản phẩm"}
                      </p>
                    </Link>
                    <div className={cx("content")}>
                      <img
                        src={require("../../../assets/img/shape-19.png")}
                        alt="Shape"
                        className={cx("shap")}
                      />
                      <div className={cx("price-name")}>
                        <h2 className={cx("name")}> {product.name}</h2>
                        <h3 className={cx("price")}>Giá {product.price}VNĐ</h3>
                      </div>
                      <div className={cx("flex-btn")}>
                        <Btn
                          href={`/checkout?from=menu&id=${product.id}`}
                          style={{
                            width: "50%",
                          }}
                          value="Mua Ngay"
                        />
                        <div className={cx("like-cart")}>
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={cx("icon-style")}
                            id={cx("like-icon")}
                            color={
                              handleCheckProductInWishList(product.id)
                                ? "#da6285"
                                : "#808080"
                            }
                            onClick={() => handleClickLike(product)}
                          />
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className={cx("icon-style")}
                            color={
                              handleCheckProductInCart(product.id)
                                ? "#da6285"
                                : "#808080"
                            }
                            onClick={() => handleClickCart(product)}
                          />
                        </div>
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
export default View1Product;
