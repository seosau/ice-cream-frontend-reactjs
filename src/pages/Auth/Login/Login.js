import { useState } from "react";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import style from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Btn, Alert } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";

const cx = className.bind(style);

function Login() {
  const { setcurrentUser, setUserToken } = useStateContext();

  const [userDataLogin, setUserDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [inputType, setInputType] = useState("password");
  const pathname = window.location.pathname;
  const setShowPassword = () => {
    setInputType((prevInputType) =>
      prevInputType === "text" ? "password" : "text"
    );
  };
  const onSubmit = () => {
    axiosClient
      .post(`${pathname}`, userDataLogin)
      .then(({ data }) => {
        Alert("success", "Đăng Nhập Thành Công", "Chúc 1 ngày tốt lành");
        setUserToken(data.token);
        setcurrentUser(data.user);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          let finalErrors = error.response.data.errors;
          setErrors(finalErrors);
          // Alert(
          //   "error",
          //   "Login Failed",
          //   "Something went wrong, please check again"
          // );
        } else {
          Alert("error", "Đăng Nhập Thất Bại", `${error.response.data.error}`);
        }
      });
  };
  return (
    <div className={cx("form-container")}>
      <form
        action=""
        method="post"
        encType="multipart/from-data"
        className={cx("login")}
      >
        <h3 className={cx("")}>đăng nhập ngay</h3>
        <div className={cx("input-field")}>
          <p className={cx("")}>
            email <span className={cx("")}>*</span>
          </p>
          <input
            className={cx("box")}
            type="email"
            name="email"
            placeholder="nhập email..."
            maxLength={50}
            required
            onChange={(e) => {
              if (errors?.email) {
                setErrors({ ...errors, email: "" });
              }
              setUserDataLogin({
                ...userDataLogin,
                email: e.target.value,
              });
            }}
            value={userDataLogin.email}
          />
          {errors?.email ? (
            <div className={cx("error")}>{errors?.email}</div>
          ) : null}
        </div>
        <div className={cx("input-field")}>
          <p className={cx("")}>
            mật khẩu <span className={cx("")}>*</span>
          </p>
          <input
            className={cx("box")}
            type={inputType}
            name="password"
            placeholder="nhập mật khẩu..."
            maxLength={50}
            required
            onChange={(e) => {
              if (errors?.password) {
                setErrors({ ...errors, password: "" });
              }
              setUserDataLogin({
                ...userDataLogin,
                password: e.target.value,
              });
            }}
            value={userDataLogin.password}
          />
          {inputType === "password" ? (
            <FontAwesomeIcon
              icon={faEye}
              className={cx("icon-showpassword")}
              onClick={setShowPassword}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className={cx("icon-showpassword")}
              onClick={setShowPassword}
            />
          )}

          {errors?.password ? (
            <div className={cx("error")}>
              {errors.password[errors?.password?.length - 1]}
            </div>
          ) : null}
        </div>
        <p className={cx("link")}>
          chưa có tài khoản?
          <Link
            to={pathname.includes("seller") ? "/seller/register" : "/register"}
          >
            đăng ký ngay
          </Link>
        </p>

        <Btn value="Login now" onclick={onSubmit}></Btn>
      </form>
    </div>
  );
}

export default Login;
