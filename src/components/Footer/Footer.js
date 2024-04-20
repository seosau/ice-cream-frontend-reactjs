import className from "classnames/bind";
import style from "./Footer.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Btn from "../Button/Btn";
import {
    faChevronRight,
    faPhone,
    faEnvelope,
    faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faPinterestP,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

const cx = className.bind(style);

function Footer() {

    const categories = [
        {
            title: "Tài khoản của tôi",
            content: ["Chung", "Lịch sử đặt hàng", "Yêu thích", "Tin tức"],
            icon: [faChevronRight],
        },
        {
            title: "Thông tin",
            content: ["Về chúng tôi", "Thông tin giao hàng", "Chính sách bảo mật", "Các điều khoản"],
            icon: [faChevronRight],
        },
        {
            title: "Tính năng",
            content: ["Nhãn hàng", "Quà tặng", "Liên kết", "Đặc biệt"],
            icon: [faChevronRight]
        },
        {
            title: "Liên hệ với chúng tôi",
            content: ["0123.456.789", "bankem@gmail.com", "Ho Chi Minh City"],
            icon: [faPhone, faEnvelope, faLocationDot]
        }
    ]

    return (
        <footer className={cx("footer")}>
            <div className={cx("content")}>
                <div className={cx("box")}>
                    <img src={require("../../assets/img/logo.png")}
                        alt="logo" />
                    <p>Chúng tôi luôn tìm kiếm những người tài năng. Đừng ngần ngại giới thiệu bản thân</p>
                    <Btn
                        href="/contact"
                        value="Liên hệ ngay"
                    />
                </div>
                {
                    categories.map((category, index) => (
                        <div className={cx("box")} key={index}>
                            <h3>{category.title}</h3>
                            {
                                category.content.map((item, i) => (
                                    category.icon.length <= 1 ? (
                                        <Link to="" key={i} className={cx("link")}>
                                            <FontAwesomeIcon icon={category.icon[0]} />
                                            <p className={cx("category")}>{item}</p>
                                        </Link>
                                    ) : (
                                        <div key={i}>
                                            <FontAwesomeIcon icon={category.icon[i]} />
                                            <p>{item}</p>
                                        </div>
                                    )
                                ))
                            }
                            {category.icon.length > 1 ? (
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
                            </div>)
                            : null}
                        </div>
                    ))
                }
            </div>
            <div className={cx("bottom")}>
                <p>© Bản quyền thuộc về nhóm CNTT2021 IS207.O11</p>
            </div>
        </footer>
    )
}

export default Footer;