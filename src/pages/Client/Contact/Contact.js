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
    user_name: "",
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
          setMessage({ user_name: "", email: "", subject: "", message: "" });
          Alert("success", "Thank you for your message");
        })
        .catch((error) => {
          if (error.response) {
            setErrors(error.response.data.errors);
          }
        });
    } else {
      Alert(
        "warning",
        "You are not logged in",
        "Please login to have more experience"
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
          <h1>Contact Us</h1>
          <p>
            Need assistance or have inquiries? Contact us anytime through our<br/>
            user-friendly contact page. Our dedicated team is ready to help you<br/>
            promptly and provide the support you need.
          </p>
        </div>
      </div>
      <div className={cx("services")}>
        <div className={cx("heading")}>
          <h1>Our Services</h1>
          <p>
            Just A Few Click To Make The Reservation Online For Saving Your Time
            And Money
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
              <h1>Free Shipping Fast</h1>
              <p>Rapid delivery with complimentary shipping!</p>
            </div>
          </div>
          <div className={cx("box")}>
            <img src={require("../../../assets/img/1.png")} alt=""></img>
            <div>
              <h1>Money Back & Guanrantee</h1>
              <p>Money-back guarantee for your assurance.</p>
            </div>
          </div>
          <div className={cx("box")}>
            <img src={require("../../../assets/img/2.png")} alt=""></img>
            <div>
              <h1>Online Support 24/7</h1>
              <p>24/7 online support for you anytime.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("form-container")}>
        <div className={cx("heading")}>
          <h1>drop us a line</h1>
          <p>
            Just A Few Click To Make The Reservation Online For Saving Your Time
            And Money
          </p>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <form className={cx("register")}>
          <div className={cx("input-field")}>
            <label>
              name <sup>*</sup>
            </label>
            <input
              className={cx("box")}
              type="text"
              name="name"
              required
              placeholder="enter your name"
              value={message.user_name}
              onChange={(e) => {
                if (errors?.user_name) {
                  setErrors({ ...errors, user_name: "" });
                }
                setMessage({ ...message, user_name: e.target.value });
              }}
            />
            {errors?.user_name ? (
              <div className={cx("error")}>{errors.user_name}</div>
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
              placeholder="enter your email"
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
              subject <sup>*</sup>
            </label>
            <input
              className={cx("box")}
              type="text"
              name="subject"
              required
              placeholder="enter your reason..."
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
              comment <sup>*</sup>
            </label>
            <textarea
              className={cx("box")}
              name="message"
              cols="30"
              rows="10"
              required
              placeholder="enter your comment..."
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
            value="send message"
            style={{ width: "40%" }}
          />
        </form>
      </div>

      <div className={cx("address")}>
        <div className={cx("heading")}>
          <h1>our contact details</h1>
          <p>
            Just A Few Click To Make The Reservation Online For Saving Your Time
            And Money
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
              <h4>address</h4>
              <p>
                1093 Marigold, Coral Way <br /> Miami, Florida, 33169
              </p>
            </div>
          </div>
          <div className={cx("box")}>
            <FontAwesomeIcon icon={faPhone} className={cx("icon-style")} />
            <div>
              <h4>phone number</h4>
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
