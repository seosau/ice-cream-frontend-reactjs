import className from "classnames/bind";
import style from "./Home.module.scss";
import { useState } from "react";
import Btn from "../../../components/Button/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const cx = className.bind(style);

function Home() {
  const slides = [
    {
      imgSrc: require("../../../assets/img/slider.jpg"),
      title1: "Chúng tôi tự hào về ",
      title2: "Hương vị đặc biệt",
    },
    {
      imgSrc: require("../../../assets/img/slider0.jpg"),
      title1: "Đồ ăn lạnh là món ăn ",
      title2: "ưa thích của tôi",
    },
  ];

  const services = [
    {
      img1: require("../../../assets/img/services.png"),
      img2: require("../../../assets/img/services (1).png"),
      title: "Vận chuyển",
      details: "Miễn phí vận chuyển",
    },
    {
      img1: require("../../../assets/img/services (2).png"),
      img2: require("../../../assets/img/services (3).png"),
      title: "Hỗ trợ",
      details: "24/7",
    },
    {
      img1: require("../../../assets/img/services (5).png"),
      img2: require("../../../assets/img/services (6).png"),
      title: "Thanh toán",
      details: "An toàn 100%",
    },
    {
      img1: require("../../../assets/img/services (7).png"),
      img2: require("../../../assets/img/services (8).png"),
      title: "dịch vụ quà tặng",
      details: "hỗ trợ dịch vụ quà tặng",
    },
    {
      img1: require("../../../assets/img/service.png"),
      img2: require("../../../assets/img/service (1).png"),
      title: "Đổi trả",
      details: "Đổi trả miễn phí 24/7",
    },
    {
      img1: require("../../../assets/img/aftersale.png"),
      img2: require("../../../assets/img/aftersale1.png"),
      title: " Dịch vụ hậu mãi",
      details: "Hết lòng với khách hàng",
    },
  ];

  const categories = [
    {
      img: require("../../../assets/img/categories.jpg"),
      title: "Dừa",
    },
    {
      img: require("../../../assets/img/categories0.jpg"),
      title: "Socola",
    },
    {
      img: require("../../../assets/img/categories2.jpg"),
      title: "Dâu",
    },
    {
      img: require("../../../assets/img/categories1.jpg"),
      title: "Bắp",
    },
  ];

  const tastes = [
    {
      title1: "vị ngọt tự nhiên",
      title2: "vanilla",
      img: require("../../../assets/img/taste.webp"),
    },
    {
      title1: "vị ngọt tự nhiên",
      title2: "matcha",
      img: require("../../../assets/img/taste0.webp"),
    },
    {
      title1: "vị ngọt tự nhiên",
      title2: "việt quất",
      img: require("../../../assets/img/taste1.webp"),
    },
  ];

  const tastes2 = [
    {
      img: require("../../../assets/img/type4.jpg"),
      title: "dâu",
    },
    {
      img: require("../../../assets/img/type3.jpg"),
      title: "dâu",
    },
    {
      img: require("../../../assets/img/type1.png"),
      title: "dâu",
    },
    {
      img: require("../../../assets/img/type2.png"),
      title: "dâu",
    },
    {
      img: require("../../../assets/img/type0.jpg"),
      title: "dâu",
    },
    {
      img: require("../../../assets/img/type5.png"),
      title: "dâu",
    },
  ];

  const statistic = [
    {
      count: 5000,
      title: "Sản phẩm",
      content: "đã bán",
    },
    {
      count: 1000,
      title: "Chứng nhận",
      content: "Bán hàng trực tuyến",
    },
  ];

  const [showSlider, setShowSlider] = useState(0);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const nextSlide = () => {
    setShowSlider((curr) => (curr + 1) % slides.length);
  };

  const prevSlide = () => {
    setShowSlider((curr) => (curr - 1 + slides.length) % slides.length);
  };

  return (
    <div className={cx("main-container")}>
      <div className={cx("slider-container")}>
        <div className={cx("slider")}>
          {slides.map((slide, index) => (
            <div
              className={cx("slideBox", { active: index === showSlider })}
              key={index}
            >
              <div className={cx("textBox")}>
                <h1 className={cx("title")}>{slide.title1}</h1>
                <h1 className={cx("title")}>{slide.title2}</h1>
                <Btn
                  href="/shop"
                  value="Khám phá ngay"
                  style={{ width: "fit-content" }}
                />
              </div>
              <div className={cx("imgBox")}>
                <img src={slide.imgSrc} alt="slider" />
              </div>
            </div>
          ))}
        </div>
        <ul className={cx("controls")}>
          <li onClick={(e) => prevSlide()} className={cx("prev")}>
            <FontAwesomeIcon icon={faArrowLeft} className={cx("icon")} />
          </li>
          <li onClick={(e) => nextSlide()} className={cx("next")}>
            <FontAwesomeIcon icon={faArrowRight} className={cx("icon")} />
          </li>
        </ul>
      </div>
      <div className={cx("service")}>
        <div className={cx("box-container")}>
          {services.map((service, index) => (
            <div className={cx("box")} key={index}>
              <div className={cx("icon")}>
                <div className={cx("icon-box")}>
                  <img
                    src={service.img1}
                    className={cx("img1")}
                    alt="service"
                  />
                  <img
                    src={service.img2}
                    className={cx("img2")}
                    alt="service"
                  />
                </div>
              </div>
              <div className={cx("detail")}>
                <h4>{service.title}</h4>
                <span>{service.details}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("categories")}>
        <div className={cx("heading")}>
          <h1>Danh mục sản phẩm</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <div className={cx("box-container")}>
          {categories.map((category, index) => (
            <div className={cx("box")} key={index}>
              <img src={category.img} alt="category" />
              <Btn
                href={`/shop?sortBy=Loại&order=${category.title}`}
                value={category.title}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={cx("menu-banner")}>
        <img
          src={require("../../../assets/img/menu-banner.jpg")}
          alt="banner"
        />
      </div>
      <div className={cx("taste")}>
        <div className={cx("heading")}>
          <span>Hương vị</span>
          <h1>Mua 1 tặng 1</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <div className={cx("box-container")}>
          {tastes.map((taste, index) => (
            <div className={cx("box")} key={index}>
              <img src={taste.img} alt="taste" />
              <div className={cx("detail")}>
                <h2>{taste.title1}</h2>
                <h1>{taste.title2}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("ice-container")}>
        <div className={cx("overlay")}></div>
        <div className={cx("detail")}>
          <h1>
            Ăn kem để <br /> giải tỏa căng thẳng
          </h1>
          <p>
          Giảm bớt căng thẳng mà không tốn kém nhiều. Sản phẩm của chúng tôi,<br/>
          với hương vị ngọt ngào, biến những khoảnh khắc căng thẳng thành niềm vui <br />
          đầy ý nghĩa. Hãy thưởng thức và trải nghiệm sự hạnh phúc trong cuộc sống!
          </p>
          <Btn
            href="/shop"
            value="Khám phá ngay"
            style={{
              width: "fit-content",
              backgroundColor: "#000",
            }}
          />
        </div>
      </div>
      <div className={cx("taste2")}>
        <div className={cx("t-banner")}>
          <div className={cx("overlay")}></div>
          <div className={cx("detail")}>
            <h1>Hãy tìm món tráng miệng phù hợp với bạn</h1>
            <p>
              Có vô vàn món tráng miệng ở đây. Hãy tìm và thưởng thức chúng
            </p>
            <Btn
              href="/shop"
              style={{
                width: "fit-content",
              }}
              value="Khám phá ngay"
            />
          </div>
        </div>
        <div className={cx("box-container")}>
          {tastes2.map((taste, index) => (
            <div className={cx("box")} key={index}>
              <div className={cx("box-overlay")}></div>
              <img src={taste.img} alt="taste" />
              <div className={cx("box-details", "fadeIn-bottom")}>
                <h1>{taste.title}</h1>
                <p>Hãy tìm món tráng miệng phù hợp với bạn</p>
                <Btn
                  href=""
                  style={{
                    width: "fit-content",
                  }}
                  value="explore more"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("flavor")}>
        <div className={cx("box-container")}>
          <img
            src={require("../../../assets/img/left-banner2.webp")}
            alt="left-banner"
          />
          <div className={cx("detail")}>
            <h1>
              Hấp dẫn! Giảm giá đến <span>20%</span>
            </h1>
            <Btn
              href="/shop"
              style={{
                width: "fit-content",
              }}
              value="Khám phá ngay"
            />
          </div>
        </div>
      </div>
      <div className={cx("newsletter")}>
        <div className={cx("content")}>
          <span>Nhận thông tin mới nhất từ chúng tôi </span>
          <h1>Nhập thông tin tại đây</h1>
          <div className={cx("input-field")}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            <Btn
              href=""
              style={{
                width: "fit-content",
                backgroundColor: "#fff",
              }}
              value="subscribe"
            />
          </div>
          <p>Không quảng cáo, không độc hại</p>
          <div className={cx("box-container")}>
            {statistic.map((value, index) => (
              <div className={cx("box")} key={index}>
                <div className={cx("box-counter")}>
                  <p className={cx("counter")}>{value.count}+</p>
                  <h3>{value.title}</h3>
                  <p>{value.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
