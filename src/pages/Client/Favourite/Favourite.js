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
  const { currentUser, setCartIds, cartIds, userToken } =
    useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setWishListIds } = useStateContext();
  const getProductsInWishList = () => {
    setLoading(true);
    axiosClient
      .get("/wishlists")
      .then(({ data }) => {
        setProducts(data.wishlists);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userToken) {
      getProductsInWishList();
    } else {
      Alert("warning", "Please login to have more experience");
      navigate("/login");
    }
  }, [userToken]);
  const handleButtonDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/wishlists/${id}`)
          .then(({ data }) => {
            setWishListIds(data.wishListIds);
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.product_id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Something went wrong",
              icon: "error",
            });
          });
      }
    });
  };
  const handleCheckProductInCart = (product_id) => {
    const isCartInMenu = cartIds?.some((item) => {
      return item.product_id === product_id;
    });
    if (isCartInMenu) return true;
    return false;
  };
  const handleClickCart = (product) => {
    if (product.stock === 0) {
      Swal.fire({
        title: "Sorry",
        text: "TThis product is temporarily out of stock",
        imageUrl: require("../../../assets/img/crying.png"),
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: "Custom image",
      });
      return;
    }
    const payload = {
      ...product,
      user_id: currentUser.id,
      quantity: 1,
      id: product.product_id,
    };
    axiosClient
      .post("/cart", payload)
      .then(({ data }) => {
        Alert("success", "Add to cart successfully");
        setCartIds(data.cartListIds);
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
          <h1>My wishlist</h1>
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
                    <Link to={`/shop/view1product/${product.product_id}`}>
                      <img src={product.image_url} alt="product" />
                    </Link>
                    <div className={cx("content")}>
                      <img
                        alt=""
                        src={require("../../../assets/img/shape-19.png")}
                        className={cx("sharp")}
                      />
                      <h3>{product.name}</h3>
                      <p className={cx("price")}>Price: ${product.price}</p>
                      <div className={cx("flex-btn")}>
                        <Btn
                          onclick={() => handleClickCart(product)}
                          style={{
                            width: "fit-content",
                          }}
                          value={
                            <>
                              {handleCheckProductInCart(product.product_id)
                                ? "Already In Cart"
                                : "Add To Cart"}

                              <FontAwesomeIcon
                                icon={faCartShopping}
                                className={cx("detail-icon-style")}
                                color={
                                  handleCheckProductInCart(product.product_id)
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
                          onclick={() => handleButtonDelete(product.product_id)}
                          style={{
                            width: "40%",
                          }}
                          value={"Delete"}
                        />
                        <Btn
                          href={`/checkout?from=menu&id=${product.product_id}`}
                          style={{
                            width: "40%",
                          }}
                          value="buy now"
                        />
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

export default memo(Favourite);
