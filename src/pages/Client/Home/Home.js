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
      title1: "we pride ourselves on ",
      title2: "exceptional flavors",
    },
    {
      imgSrc: require("../../../assets/img/slider0.jpg"),
      title1: "cold treats are my kind",
      title2: "of comfort food",
    },
  ];

  const services = [
    {
      img1: require("../../../assets/img/services.png"),
      img2: require("../../../assets/img/services (1).png"),
      title: "delivery",
      details: "Delivery Free",
    },
    {
      img1: require("../../../assets/img/services (2).png"),
      img2: require("../../../assets/img/services (3).png"),
      title: "support",
      details: "24/7 hours",
    },
    {
      img1: require("../../../assets/img/services (5).png"),
      img2: require("../../../assets/img/services (6).png"),
      title: "payment",
      details: "100% secure",
    },
    {
      img1: require("../../../assets/img/services (7).png"),
      img2: require("../../../assets/img/services (8).png"),
      title: "gift service",
      details: "support gift service",
    },
    {
      img1: require("../../../assets/img/service.png"),
      img2: require("../../../assets/img/service (1).png"),
      title: "returns",
      details: "24/7 free returns",
    },
    {
      img1: require("../../../assets/img/aftersale.png"),
      img2: require("../../../assets/img/aftersale1.png"),
      title: "after sale",
      details: "Dedicated",
    },
  ];

  const categories = [
    {
      img: require("../../../assets/img/categories.jpg"),
      title: "coconut",
    },
    {
      img: require("../../../assets/img/categories0.jpg"),
      title: "chocolate",
    },
    {
      img: require("../../../assets/img/categories2.jpg"),
      title: "strawberry",
    },
    {
      img: require("../../../assets/img/categories1.jpg"),
      title: "corn",
    },
  ];

  const tastes = [
    {
      title1: "natural sweetness",
      title2: "vanilla",
      img: require("../../../assets/img/taste.webp"),
    },
    {
      title1: "natural sweetness",
      title2: "matcha",
      img: require("../../../assets/img/taste0.webp"),
    },
    {
      title1: "natural sweetness",
      title2: "blueberry",
      img: require("../../../assets/img/taste1.webp"),
    },
  ];

  const tastes2 = [
    {
      img: require("../../../assets/img/type4.jpg"),
      title: "strawberry",
    },
    {
      img: require("../../../assets/img/type3.jpg"),
      title: "strawberry",
    },
    {
      img: require("../../../assets/img/type1.png"),
      title: "strawberry",
    },
    {
      img: require("../../../assets/img/type2.png"),
      title: "strawberry",
    },
    {
      img: require("../../../assets/img/type0.jpg"),
      title: "strawberry",
    },
    {
      img: require("../../../assets/img/type5.png"),
      title: "strawberry",
    },
  ];

  const statistic = [
    {
      count: 5000,
      title: "Successfully Trained",
      content: "Learner & counting",
    },
    {
      count: 1000,
      title: "Certification seller",
      content: "Online seller",
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
                  value="shop now"
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
          <h1>categories features</h1>
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
                href={`/shop?sortBy=category&order=${category.title}`}
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
          <span>Taste</span>
          <h1>buy any ice cream @ get one free</h1>
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
            Ice cream is cheaper than <br /> therapy for stress
          </h1>
          <p>
            Scoop away stress without breaking the bank. Our ice cream, a sweet <br/>
            therapy, offers an affordable escape, turning moments of tension <br/>
            into delicious pockets of joy. Indulge, destress, and savor life
          </p>
          <Btn
            href="/shop"
            value="shop now"
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
            <h1>find your taste of desserts</h1>
            <p>
              Treat them to a delicious treat and send them some Luck'o the
              Irish too!
            </p>
            <Btn
              href="/shop"
              style={{
                width: "fit-content",
              }}
              value="shop now"
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
                <p>Find your taste of desserts</p>
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
              hot deal! sale up to <span>20% off</span>
            </h1>
            <p>expired</p>
            <Btn
              href="/shop"
              style={{
                width: "fit-content",
              }}
              value="shop now"
            />
          </div>
        </div>
      </div>
      <div className={cx("newsletter")}>
        <div className={cx("content")}>
          <span>get the latest information from us </span>
          <h1>subscribe our newsletter</h1>
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
          <p>no ads, no trails, no commitment</p>
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
