import className from "classnames/bind";
import style from "./AdminHeader.module.scss";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faEye,
  faFileImport,
  faRightFromBracket,
  faUserPlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import Btn from "../Button/Btn";
import axiosClient from "../../axiosClient/axios";
import { useStateContext } from "../../context/ContextProvider";
import Alert from "../Alert/Alert";
const cx = className.bind(style);
const sidebarClass = cx("sidebar");
const sidebarActive = sidebarClass + " " + cx("active");

function Header({ children }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const { currentUser, setcurrentUser, userToken, setUserToken } =
    useStateContext();
  const currentURL = window.location.pathname;

  const image_url = currentUser.image_url
    ? currentUser.image_url
    : require("../../assets/img/avt.jpg");
  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  function handleResize() {
    setViewportWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    if (userToken) {
      axiosClient
        .get(currentURL.includes("seller") ? "/seller" : "/admin")
        .then(({ data }) => {
          setcurrentUser(data);
        })
        .catch((error) => {
          return error;
        });
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = (
    url = currentURL.includes("seller") ? "/seller/logout" : "/admin/logout"
  ) => {
    axiosClient
      .post(url)
      .then((res) => {
        setcurrentUser({});
        setUserToken(null);
        handleShowProfile();
        Alert("success", "Logout Successfully");
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <div className={cx("main")}>
      <div className={cx("header-container")}>
        <div className={cx("header")}>
          <div className={cx("left")}>
            <div className={cx("logo")}>
              <img
                src={require("../../assets/img/logo.png")}
                width="130"
                alt="logo"
              />
            </div>
            <FontAwesomeIcon
              icon={faBars}
              onClick={(e) => handleShowSideBar()}
              className={cx("toggle-btn")}
              style={
                showSideBar
                  ? {
                      left: "250px",
                      transform: "rotate(90deg) ",
                    }
                  : { left: "30px" }
              }
            />
          </div>

          <FontAwesomeIcon
            className={cx("user-icon")}
            icon={faUser}
            onClick={(e) => handleShowProfile()}
          />

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
                      href={currentURL.includes('seller') ? "/seller/profile" : '/admin/profile'}
                      onclick={() => handleShowProfile()}
                      value="profile"
                      style={{width:'100%'}}
                    ></Btn>
                    <Btn value="logout" onclick={handleLogout}  style={{width:'100%'}}></Btn>
                  </div>
                </div>
              ) : (
                <>
                  <p className={cx("text")}>Please register or login</p>
                  <div className={cx("flex-btn")}>
                    <Btn href="/seller/login" value="login"></Btn>
                    <Btn href="/seller/register" value="register"></Btn>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
        <div className={cx("sidebar-container")}>
          <div className={showSideBar ? sidebarActive : sidebarClass}>
            <div className={cx("profile")}>
              <img
                src={image_url}
                className={cx("user-img")}
                width="150"
                height="150"
                alt="logo"
              />
              <p className={cx("profile-name")}>{currentUser.name}</p>
            </div>

            <h5>menu</h5>
            <div className={cx("navbar")}>
              <ul>
                <li>
                  <Link to={currentURL.includes('seller') ? "/seller/dashboard" : '/admin/dashboard'}>
                    <FontAwesomeIcon
                      className={cx("sidebar-icon")}
                      icon={faHome}
                    />
                    <p>dashboard</p>
                  </Link>
                </li>
                <li>
                  <Link to={currentURL.includes('seller') ? "/seller/addproduct" : '/admin/addstaff'}>
                    <FontAwesomeIcon
                      className={cx("sidebar-icon")}
                      icon={faFileImport}
                    />
                    <p>{currentURL.includes('seller') ? 'add products' : 'add sellers' }</p>
                  </Link>
                </li>
                <li>
                  <Link to={currentURL.includes('seller') ? "/seller/viewproduct" : '/admin/viewproduct'}>
                    <FontAwesomeIcon
                      className={cx("sidebar-icon")}
                      icon={faEye}
                    />
                    <p>view product</p>
                  </Link>
                </li>
                <li>
                  <Link to={currentURL.includes('seller') ? "/seller/profile" : '/admin/profile'}>
                    <FontAwesomeIcon
                      className={cx("sidebar-icon")}
                      icon={faUserPlus}
                    />
                    <p>accounts</p>
                  </Link>
                </li>
                <li>
                  <Link to="" onClick={() => handleLogout()}>
                    <FontAwesomeIcon
                      className={cx("sidebar-icon")}
                      icon={faRightFromBracket}
                    />
                    <p>logout</p>
                  </Link>
                </li>
              </ul>
            </div>
            <h5>find us</h5>
            <div className={cx("social-links")}>
              <FontAwesomeIcon
                className={cx("social-icon")}
                icon={faFacebookF}
              />
              <FontAwesomeIcon
                className={cx("social-icon")}
                icon={faInstagram}
              />
              <FontAwesomeIcon
                className={cx("social-icon")}
                icon={faLinkedinIn}
              />
              <FontAwesomeIcon
                className={cx("social-icon")}
                icon={faXTwitter}
              />
              <FontAwesomeIcon
                className={cx("social-icon")}
                icon={faPinterestP}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cx("main-container")}
        style={{
          width:
            (viewportWidth / 100) * 18 > 220
              ? "81vw"
              : viewportWidth - 220 + "px",
          left:
            showSideBar && (viewportWidth / 100) * 18 < 220
              ? "180px"
              : (viewportWidth / 100) * 18 < 220
              ? "12vw"
              : null,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Header;
