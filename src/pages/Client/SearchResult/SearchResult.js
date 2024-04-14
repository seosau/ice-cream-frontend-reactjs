import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import className from "classnames/bind";
import style from "./SearchResult.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Btn, Loader } from "../../../components";
import FilterProducts from "../../../components/FilterProducts/FilterProducts";
import PaginationLinks from "../../../components/PaginationLinks/PaginationLinks";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../axiosClient/axios";
import Alert from "../../../components/Alert/Alert";
const cx = className.bind(style);

function SearchResult() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const {
    currentUser,
    wishListIds,
    setWishListIds,
    cartIds,
    setCartIds,
    setQuantityCart,
  } = useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [params, setParams] = useState({});
  const currentURL = window.location.search;
  const isSort = currentURL.includes("sortBy");
  const getProducts = (url = `/searchproduct/${keyword}`) => {
    setLoading(true);
    var payload = {};
    if (url.includes("searchproduct")) {
      payload = { ...params };
    }
    axiosClient
      .get(url, {
        params: payload,
      })
      .then(({ data }) => {
        setProducts(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsFromCurrentUrl = () => {
    if (isSort === true) {
      const searchParams = new URLSearchParams(currentURL);
      const sortBy = searchParams.get("sortBy");
      const order = searchParams.get("order");
      setParams({
        sortBy: sortBy,
        order: order,
      });
      onGetSortValue(sortBy, order);
    }
    return;
  };
  const onGetSortValue = (sortBy, order) => {
    setLoading(true);
    setParams({ sortBy, order });
    axiosClient
      .get(`/searchproduct/${keyword}`, {
        params: {
          sortBy: sortBy,
          order: order,
        },
      })
      .then(({ data }) => {
        setProducts(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onPageClick = (link) => {
    getProducts(link.url);
  };
  const handleCheckProductInWishList = (product_id) => {
    const isWishInMenu = wishListIds.some((item) => {
      return item.product_id === product_id;
    });
    if (isWishInMenu) return true;
    return false;
  };
  const handleCheckProductInCart = (product_id) => {
    const isCartInMenu = cartIds.some((item) => {
      return item.product_id === product_id;
    });
    if (isCartInMenu) return true;
    return false;
  };
  useEffect(() => {
    if (isSort === false) {
      getProducts();
    } else {
      return;
    }
  }, [keyword]);
  useEffect(() => {
    getProductsFromCurrentUrl();
  }, []);
  const handleClickLike = (product) => {
    if (currentUser.id) {
      const payload = { ...product, user_id: currentUser.id };
      axiosClient
        .post("/wishlists", payload)
        .then(({ data }) => {
          setWishListIds(data.wishListIds);
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
  const handleBuyProduct = (product) => {
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
      navigate("/checkout");
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
      <div className={cx("banner")}>
        <div className={cx("detail")}>
          <h1>Tìm Kiếm Sản Phẩm</h1>
          <p>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing
            <br />
            elit, sed do eiusmod tempor incididunt ut labore et <br />
            dolore magna aliqua. */}
          </p>
        </div>
      </div>
      <div className={cx("products")}>
        <div className={cx("heading")}>
          <h1>Những món ngon mới nhất</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {products.length > 0 && (
          <FilterProducts
            meta={meta}
            onPageClick={onPageClick}
            onGetSortValue={onGetSortValue}
          />
        )}
        {loading && <Loader />}
        <div className={cx("box-container")}>
          {!loading && (
            <>
              {products.length > 0 ? (
                products.map((product) => (
                  <div className={cx("box")} key={product.id}>
                    <Link
                      to={`/shop/view1product/${product.id}`}
                      state={product}
                      className={cx("view-order")}
                    >
                      <img src={product.image_url} alt="product" />
                      <p className={cx("status")}>
                        {product.stock > 9
                          ? "Còn sản phẩm"
                          : product.stock > 0
                          ? `Nhanh, chỉ còn ${product.stock} sản phẩm`
                          : "Hết sản phẩm"}
                      </p>
                    </Link>
                    <div className={cx("content")}>
                      <img
                        src={require("../../../assets/img/shape-19.png")}
                        alt="Shape"
                        className={cx("shap")}
                      />
                      <div className={cx("price-name")}>
                        <h2 className={cx("price")}>Giá {product.price}VNĐ</h2>
                        <h3 className={cx("name")}>{product.name}</h3>
                      </div>
                      <div className={cx("flex-btn")}>
                        <Btn
                          onclick={() => handleBuyProduct(product)}
                          style={{
                            width: "fit-content",
                          }}
                          value="Mua Ngay"
                          href={`?from=menu&id=${product.id}`}
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
        {products.length > 0 && (
          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        )}
      </div>
    </div>
  );
}

export default SearchResult;
