import { useState } from "react";
import className from "classnames/bind";
import style from "./Register.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Btn from "../../../components/Button/Btn";
import axiosClient from "../../../axiosClient/axios.js";

import { useNavigate, Link } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
const cx = className.bind(style);

function Register() {
  const navigate = useNavigate();
  const [userDataRegister, setUserDataRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: "",
    image_url: "",
  });
  const [inputType, setInputType] = useState("password");
  const setShowPassword = () => {
    setInputType((prevInputType) =>
      prevInputType === "text" ? "password" : "text"
    );
  };
  const pathname = window.location.pathname;
  const [errors, setErrors] = useState({});
  const onImageChoose = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUserDataRegister({
        ...userDataRegister,
        image: file,
        image_url: reader.result,
      });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = async () => {
    const payload = { ...userDataRegister };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    await axiosClient
      .post(`${pathname}`, payload)
      .then(({ data }) => {
        if (pathname.includes("admin")) {
          Alert("success", "Thêm Nhân Viên Thành Công");
          setUserDataRegister({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            image: "",
            image_url: "",
          });
        } else {
          Alert(
            "success",
            "Đăng Ký Thành Công",
            "Đăng nhập ngay để trải nghiệm"
          );
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          let finalErrors = error.response.data.errors;
          setErrors(finalErrors);
          // Alert(
          //   "error",
          //   "Register Failed",
          //   "Something went wrong, please check again"
          // );
        }
      });
  };
  return (
    <div className={cx("form-container")}>
      <form encType="multipart/from-data" className={cx("register")}>
        <h3 className={cx("")}>
          {pathname.includes("admin") ? "thêm nhân viên mới" : "đăng ký ngay"}
        </h3>
        <div className={cx("")}>
          <div className={cx("input-field")}>
            <p className={cx("")}>
              {pathname.includes("admin") ? "họ và tên nhân viên" : "họ và tên"}
              <span className={cx("")}>*</span>
            </p>
            <input
              className={cx("box")}
              type="text"
              name="name"
              placeholder="nhập họ và tên..."
              maxLength={50}
              onChange={(e) => {
                if (errors?.name) {
                  setErrors({ ...errors, name: "" });
                }
                setUserDataRegister({
                  ...userDataRegister,
                  name: e.target.value,
                });
              }}
              value={userDataRegister.name}
            />
            {errors?.name ? (
              <div className={cx("error")}>{errors?.name}</div>
            ) : null}
          </div>
          <div className={cx("input-field")}>
            <p className={cx("")}>
              {pathname.includes("admin") ? "email của nhân viên" : "email"}
              <span className={cx("")}>*</span>
            </p>
            <input
              className={cx("box")}
              type="email"
              name="email"
              placeholder="nhập email..."
              maxLength={50}
              onChange={(e) => {
                if (errors?.email) {
                  setErrors({ ...errors, email: "" });
                }
                setUserDataRegister({
                  ...userDataRegister,
                  email: e.target.value,
                });
              }}
              value={userDataRegister.email}
            />
            {errors?.email ? (
              <div className={cx("error")}>{errors?.email}</div>
            ) : null}
          </div>
          <div className={cx("input-field")}>
            <p className={cx("")}>
              {/* {pathname.includes("admin") ? "seller" : "your"} mật khẩu{" "} */}
              mật khẩu
              <span className={cx("")}>*</span>
            </p>
            <input
              className={cx("box")}
              type={inputType}
              name="password"
              placeholder="nhập mật khẩu..."
              maxLength={50}
              onChange={(e) => {
                if (errors?.password) {
                  setErrors({ ...errors, password: "" });
                }
                setUserDataRegister({
                  ...userDataRegister,
                  password: e.target.value,
                });
              }}
              value={userDataRegister.password}
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
          <div className={cx("input-field")}>
            <p className={cx("")}>
              xác nhận mật khẩu <span className={cx("")}>*</span>
            </p>
            <input
              className={cx("box")}
              type="password"
              name="password-confirmation"
              placeholder="nhập lại mật khẩu..."
              maxLength={50}
              onChange={(e) => {
                if (errors?.password) {
                  setErrors({ ...errors, password: "" });
                }
                setUserDataRegister({
                  ...userDataRegister,
                  password_confirmation: e.target.value,
                });
              }}
              value={userDataRegister.password_confirmation}
            />
            {errors?.password && errors.password?.length > 1 ? (
              <div className={cx("error")}>{errors.password[0]}</div>
            ) : null}
          </div>
          <div className={cx("input-field")}>
            <p>
              {/* {pathname.includes("admin") ? "seller" : "your"} ảnh đại diện{" "} */}
              ảnh đại diện
              <span>*</span>
            </p>
            <div className={cx("profile-img-box")}>
              {userDataRegister.image_url && (
                <img
                  src={userDataRegister.image_url}
                  alt="user img"
                  className={cx("img-choose")}
                />
              )}
              {!userDataRegister.image_url && (
                <div>
                  <FontAwesomeIcon
                    icon={faImage}
                    className={cx("icon-style")}
                  />
                </div>
              )}
              <button className={cx("btn-chooseImg")}>
                <input
                  className={cx("img-choose-input")}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={onImageChoose}
                />
                Đổi
              </button>
            </div>
          </div>
        </div>

        {!pathname.includes("admin") ? (
          <p className={cx("link")}>
            đã có tài khoản?
            <Link to={pathname.includes("seller") ? "/seller/login" : "/login"}>
              đăng nhập ngay
            </Link>
          </p>
        ) : null}
        <Btn
          value={pathname.includes("admin") ? "Add seller" : "register now"}
          onclick={onSubmit}
        ></Btn>
      </form>
    </div>
  );
}

export default Register;
