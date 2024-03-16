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
        Alert("success", "Update Successfully", "Have a nice day");
        navigate(url.includes('seller') ? "/seller/dashboard" : '/admin/dashboard');
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
          Alert(
            "error",
            "Update Failed",
            "Something went wrong, please check again"
          );
        }
      });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>update profile details</h1>
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
                    your name <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="text"
                    name="name"
                    placeholder="your old name"
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
                    your email <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="email"
                    name="email"
                    placeholder="youroldemail@gmail.com"
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
                    select picture <span>*</span>
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
                    your old password <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="password"
                    name="oldpass"
                    placeholder="enter your old password"
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
                    your new password <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="password"
                    name="newpass"
                    placeholder="enter your new password"
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
                    confirm password <span>*</span>
                  </p>
                  <input
                    className={cx("box")}
                    type="password"
                    name="cpass"
                    placeholder="confirm your password"
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
              <Btn value={"update profile"} onclick={onUpdate} />
              <Btn href="/seller/dashboard" value="Go Back"></Btn>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
