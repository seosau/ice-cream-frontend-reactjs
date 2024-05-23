import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Btn, Alert } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);

function Contact() {
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [message, setMessage] = useState({
    userId: currentUser.id,
    userName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmitMessage = async () => {
    if (currentUser.id) {
      const payload = { ...message };
      await axiosClient
        .post("/message", payload)
        .then(({ data }) => {
          setMessage({ userId: currentUser.id, userName: "", email: "", subject: "", message: "" });
          Alert("success", "Cảm ơn góp ý của bạn");
        })
        .catch((error) => {
          if (error.response) {
            setErrors(error.response.data.errors);
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={cx("main-container")}>
      <div className={cx("banner")}>
        <div className={cx("detail")}>
          <h1>Liên hệ chúng tôi</h1>
          <p>
            Bạn cần hỗ trợ hoặc có thắc mắc? Hãy liên hệ với chúng tôi bất cứ{" "}
            <br />
            lúc nào thông qua trang người dùng của chúng tôi. Đội ngũ chuyên{" "}
            <br />
            nghiệp của chúng tôi sẵn sàng giải đáp thắc mắc và cung cấp sự hỗ{" "}
            <br />
            trợ mà bạn cần
          </p>
        </div>
      </div>
      <div className={cx("services")}>
        <div className={cx("heading")}>
          <h1>Dịch vụ của chúng tôi</h1>
          <p>
            Chỉ cần vài cú click để đặt chỗ trực tuyến và tiết kiệm thời gian
            cũng như tiền bạc của bạn
          </p>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <div className={cx("box-container")}>
          <div className={cx("box")}>
            <img src={require("../../../assets/img/0.png")} alt=""></img>
            <div>
              <h1>Giao nhanh miễn phí</h1>
              <p>Giao hàng nhanh chóng và miễn phí!</p>
            </div>
          </div>
          <div className={cx("box")}>
            <img src={require("../../../assets/img/1.png")} alt=""></img>
            <div>
              <h1>Hoàn tiền & Bảo đảm</h1>
              <p>Cam kết hoàn tiền để đảm bảo cho bạn</p>
            </div>
          </div>
          <div className={cx("box")}>
            <img src={require("../../../assets/img/2.png")} alt=""></img>
            <div>
              <h1>Hỗ trợ trực tuyến 24/7</h1>
              <p>Giúp bạn có thể liên hệ bất cứ lúc nào</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("form-container")}>
        <div className={cx("heading")}>
          <h1>liên hệ với chúng tôi</h1>
          <p>
            Chỉ cần vài cú click để đặt chỗ trực tuyến và tiết kiệm thời gian
            cũng như tiền bạc của bạn
          </p>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <form className={cx("register")}>
          <div className={cx("input-field")}>
            <label>
              tên <sup>*</sup>
            </label>
            <input
              className={cx("box")}
              type="text"
              name="name"
              required
              // placeholder="enter your name"
              value={message.userMame}
              onChange={(e) => {
                if (errors?.userName) {
                  setErrors({ ...errors, userName: "" });
                }
                setMessage({ ...message, userName: e.target.value });
              }}
            />
            {errors?.user_name ? (
              <div className={cx("error")}>{errors.userName}</div>
            ) : null}
          </div>
          <div className={cx("input-field")}>
            <label>
              email <sup>*</sup>
            </label>
            <input
              className={cx("box")}
              type="text"
              name="email"
              required
              // placeholder="enter your email"
              value={message.email}
              onChange={(e) => {
                if (errors?.email) {
                  setErrors({ ...errors, email: "" });
                }
                setMessage({ ...message, email: e.target.value });
              }}
            />
            {errors?.email ? (
              <div className={cx("error")}>{errors.email}</div>
            ) : null}
          </div>
          <div className={cx("input-field")}>
            <label>
              tiêu đề <sup>*</sup>
            </label>
            <input
              className={cx("box")}
              type="text"
              name="subject"
              required
              // placeholder="enter your reason..."
              value={message.subject}
              onChange={(e) => {
                if (errors?.subject) {
                  setErrors({ ...errors, subject: "" });
                }
                setMessage({ ...message, subject: e.target.value });
              }}
            />
            {errors?.subject ? (
              <div className={cx("error")}>{errors.subject}</div>
            ) : null}
          </div>
          <div className={cx("input-field")}>
            <label>
              nội dung <sup>*</sup>
            </label>
            <textarea
              className={cx("box")}
              name="message"
              cols="30"
              rows="10"
              required
              // placeholder="enter your comment..."
              value={message.message}
              onChange={(e) => {
                if (errors?.message) {
                  setErrors({ ...errors, message: "" });
                }
                setMessage({ ...message, message: e.target.value });
              }}
            />
            {errors?.message ? (
              <div className={cx("error")}>{errors.message}</div>
            ) : null}
          </div>
          <Btn
            onclick={handleSubmitMessage}
            value="gửi"
            style={{ width: "40%" }}
          />
        </form>
      </div>

      <div className={cx("address")}>
        <div className={cx("heading")}>
          <h1>Thông tin liên hệ</h1>
          <p>
            Chỉ cần vài cú click để đặt chỗ trực tuyến và tiết kiệm thời gian
            cũng như tiền bạc của bạn
          </p>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <div className={cx("box-container")}>
          <div className={cx("box")}>
            <FontAwesomeIcon
              icon={faMapLocationDot}
              className={cx("icon-style")}
            />
            <div>
              <h4>Địa chỉ</h4>
              <p>
                Đường Hàn Thuyên, khu phố 6 P,
                <br /> Thủ Đức, Thành phố Hồ Chí Minh
              </p>
            </div>
          </div>
          <div className={cx("box")}>
            <FontAwesomeIcon icon={faPhone} className={cx("icon-style")} />
            <div>
              <h4>Số điện thoại</h4>
              <p>0934102546</p>
              <p>0358000001</p>
            </div>
          </div>
          <div className={cx("box")}>
            <FontAwesomeIcon icon={faEnvelope} className={cx("icon-style")} />
            <div>
              <h4>email</h4>
              <p>icreamshop@gmail.com</p>
              <p>icecreampinky@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={cx("box-map")}>
          <iframe
            alt=""
            title="map"
            className={cx("box-mapdetail")}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2311712352484!2d106.80047917586931!3d10.870014157458742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1702533990688!5m2!1svi!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
