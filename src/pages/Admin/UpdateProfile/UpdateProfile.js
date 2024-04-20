import className from "classnames/bind";
import style from "./UpdateProfile.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Btn, Loader, Alert } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);
function UpdateProfile() {
  const navigate = useNavigate();
  const { currentUser, setcurrentUser } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const currentURL = window.location.pathname;
  const [userDataUpdate, setUserDataUpdate] = useState({
    name: "",
    email: "",
    old_password: "",
    password: "",
    password_confirmation: "",
    image: null,
    image_url: null,
  });
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(currentURL.includes("seller") ? "seller" : "admin")
      .then(({ data }) => {
        setUserDataUpdate(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const user_img_url = currentUser.image_url
    ? currentUser.image_url
    : require("../../../assets/img/avt.png");
  const onImageChoose = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUserDataUpdate({
        ...userDataUpdate,
        image: file,
        image_url: reader.result,
      });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  const onUpdate = async () => {
    const payload = { ...userDataUpdate };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
   const url = currentURL.includes("seller")
      ? "/seller/updateprofile"
      : "/admin/updateprofile";
    await axiosClient
      .post(url, payload)
      .then(({ data }) => {
        console.log(data);
        setcurrentUser(data);
        Alert("Thành công", "Cập nhật thành công", "Chúc một ngày tốt lành");
        navigate(url.includes('seller') ? "/seller/dashboard" : '/admin/dashboard');
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
          Alert(
            "Lỗi",
            "Cập nhật thất bại",
            "Đã có lỗi xảy ra"
          );
        }
      });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Cập nhật thông tin tài khoản</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className={cx("form-container")}>
          <form className={cx("form")}>
            <div className={cx("img-box")}>
              <img
                src={
                  userDataUpdate.image_url
                    ? userDataUpdate.image_url
                    : user_img_url
                }
                alt="image"
              />
            </div>
            <div className={cx("flex")}>
              <div className={cx("col")}>
                <div className={cx("input-field")}>
                  <p>
                    Họ tên <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="text"
                    name="name"
                    placeholder="Nhập họ tên"
                    //fetch placeholder from db
                    value={userDataUpdate.name}
                    onChange={(e) =>
                      setUserDataUpdate({
                        ...userDataUpdate,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={cx("input-field")}>
                  <p>
                    Email <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    //fetch placeholder from db
                    value={userDataUpdate.email}
                    onChange={(e) =>
                      setUserDataUpdate({
                        ...userDataUpdate,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={cx("input-field")}>
                  <p>
                    Ảnh đại diện <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => onImageChoose(e)}
                  />
                </div>
              </div>
              <div className={cx("col")}>
                <div className={cx("input-field")}>
                  <p>
                    Mật khẩu cũ <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="password"
                    name="oldpass"
                    placeholder="Nhập mật khẩu cũ"
                    value={userDataUpdate.old_password}
                    onChange={(e) =>
                      setUserDataUpdate({
                        ...userDataUpdate,
                        old_password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={cx("input-field")}>
                  <p>
                    Nhập mật khẩu mới <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="password"
                    name="newpass"
                    placeholder="Nhập mật khẩu mới"
                    value={userDataUpdate.password}
                    onChange={(e) =>
                      setUserDataUpdate({
                        ...userDataUpdate,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={cx("input-field")}>
                  <p>
                    Xác nhận mật khẩu mới <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="password"
                    name="cpass"
                    placeholder="Nhập lại mật khẩu mới"
                    value={userDataUpdate.password_confirmation}
                    onChange={(e) =>
                      setUserDataUpdate({
                        ...userDataUpdate,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className={cx("flex-btn")}>
              <Btn value={"Cập nhật"} onclick={onUpdate} />
              <Btn href="/seller/dashboard" value="Quay lại"></Btn>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
