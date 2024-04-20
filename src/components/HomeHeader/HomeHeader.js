import className from "classnames/bind";
import style from "./HomeHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { Btn, Search } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient/axios";
import Alert from "../Alert/Alert";
const cx = className.bind(style);
const navBarClass = cx("navbar");
const navBarActive = navBarClass + " " + cx("active");
const searchFormClass = cx("search-form");
const searchFormActive = searchFormClass + " " + cx("active");
function HomeHeader({ children }) {
  const {
    currentUser,
    userToken,
    setcurrentUser,
    setUserToken,
    wishListIds,
    setWishListIds,
    cartIds,
    setCartIds,
  } = useStateContext();
  const image_url = currentUser.image_url
    ? currentUser.image_url
    : require("../../assets/img/avt.jpg");
  const [showNavBar, setShowNavBar] = useState(false);
  const [showSearchForm, setShowSeachForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken) {
      axiosClient
        .get("/me")
        .then(({ data }) => {
          setcurrentUser(data);
        })
        .catch((error) => {
          return error;
        });
    }
  }, []);
  useEffect(() => {
    if (!currentUser.id) {
      return;
    }
    axiosClient
      .get("/quantitywishlists")
      .then(({ data }) => {
        setWishListIds(data.wishListIds);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser, setWishListIds]);
  useEffect(() => {
    if (!currentUser.id) {
      return;
    }
    axiosClient
      .get("/quantityCartItems")
      .then(({ data }) => {
        setCartIds(data.cartIds);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser, setCartIds]);
  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  };

  const handleShowSearchForm = () => {
    setShowSeachForm(!showSearchForm);
  };

  const handleLogout = () => {
    axiosClient
      .post("/logout")
      .then((res) => {
        setcurrentUser({});
        setUserToken(null);
        handleShowProfile();
        navigate("/home");
        Alert("success", "Logout Successfully");
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <>
      <div className={cx("header")}>
        <section className={cx("flex")}>
          <Link to="/" className={cx("logo")}>
            <img
              src={require("../../assets/img/logo.png")}
              width="130"
              alt="logo"
            />
          </Link>
          <nav className={showNavBar ? navBarActive : navBarClass}>
            <Link to="/">Trang chủ</Link>
            <Link to="/about">Về chúng tôi</Link>
            <Link to="/shop">Sản phẩm</Link>
            <Link to="/order">Đơn đã đặt</Link>
            <Link to="/contact">Liên hệ</Link>
          </nav>
          <Search
            classname={showSearchForm ? searchFormActive : searchFormClass}
          />
          <div className={cx("icons")}>
            <div id={cx("menu-btn")}>
              <FontAwesomeIcon
                icon={faPlus}
                className={cx("icon-style")}
                onClick={(e) => handleShowNavBar()}
              />
            </div>
            <div id={cx("search-btn")}>
              <FontAwesomeIcon
                icon={faSearch}
                className={cx("icon-style")}
                onClick={(e) => handleShowSearchForm()}
              />
            </div>
            <Link to="/favourite">
              <FontAwesomeIcon icon={faHeart} className={cx("icon-style")} />
              {wishListIds?.length > 0 ? <sup>{wishListIds.length}</sup> : null}
            </Link>
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className={cx("icon-style")}
              />
              {cartIds?.length > 0 ? <sup>{cartIds.length}</sup> : null}
            </Link>
            <div id="user-btn">
              <FontAwesomeIcon
                icon={faUser}
                className={cx("icon-style")}
                onClick={(e) => handleShowProfile()}
              />
            </div>
          </div>
          {showProfile ? (
            <div className={cx("profile-detail")}>
              {currentUser && userToken ? (
                <div className={cx("profile")}>
                  <img
                    src={image_url}
                    className={cx("profile-img")}
                    alt="profile"
                  />
                  <p className={cx("profile-name")}>{currentUser.name}</p>
                  <div className={cx("flex-btn")}>
                    <Btn
                      href="/profile"
                      value="profile"
                      onclick={(e) => handleShowProfile()}
                    ></Btn>
                    <Btn value="logout" onclick={handleLogout}></Btn>
                  </div>
                </div>
              ) : (
                <>
                  <p className={cx("text")}>Vui lòng đăng ký hoặc đăng nhập.</p>
                  <div className={cx("flex-btn")}>
                    <Btn href="/login" value="login" style={{ width: '40%' }}></Btn>
                    <Btn href="/register" value="register" style={{ width: '40%' }}></Btn>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </section>
      </div>
      {children}
    </>
  );
}

export default memo(HomeHeader);
