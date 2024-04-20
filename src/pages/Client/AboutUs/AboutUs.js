import React, { useEffect } from "react";
import className from "classnames/bind";
import { Btn } from "../../../components";
import style from "./AboutUs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
const cx = className.bind(style);

function AboutUs() {
  useEffect(() => {
    const btn = document.getElementsByClassName(cx("btn"));
    const slide = document.getElementById(cx("slide"));
    const windowWidth = window.innerWidth;
    btn[0].addEventListener("click", function () {

      slide.style.transform = "translateX(0px)";
      for (let i = 0; i < 4; i++) {
        btn[i].id = cx("");
      }
      this.id = cx("now-active");
    });

    btn[1].addEventListener("click", function () {
      if (windowWidth <= 968)
        slide.style.transform = "translateX(-100vw)";
      else
        slide.style.transform = "translateX(-800px)";
      for (let i = 0; i < 4; i++) {
        btn[i].id = cx("");
      }
      this.id = cx("now-active");
    });

    btn[2].addEventListener("click", function () {
      if (windowWidth <= 768)
        slide.style.transform = "translateX(-200vw)";
      else
        slide.style.transform = "translateX(-1600px)";
      for (let i = 0; i < 4; i++) {
        btn[i].id = cx("");
      }
      this.id = cx("now-active");
    });

    btn[3].addEventListener("click", function () {
      if (windowWidth <= 430)
        slide.style.transform = "translateX(-300vw)";
      else
        slide.style.transform = "translateX(-2400px)";
      for (let i = 0; i < 4; i++) {
        btn[i].id = cx("");
      }
      this.id = cx("now-active");
    });
  }, []);
  return (
    <div className={cx("main-container")}>
      <div className={cx("banner")}>
        <div className={cx("detail")}>
          <h1>Về chúng tôi</h1>
          <p>
            Chào mừng bạn đến thiên đường kem của chúng tôi! Tận hưởng những hương vị <br />
            ngon nhất từ Vanilla Bean truyền thống đến những sáng tạo mới lạ nhất. Đặt hàng <br />
            trực tuyến và chúng tôi sẽ giao kem chất lượng đến tận cửa nhà bạn. Hãy thả mình <br />
            vào thế giới của những hương vị, nơi niềm vui đang chờ đợi bạn. Hành trình <br />
            khám phá hạnh phúc băng giá của bạn bắt đầu từ đây!
          </p>
        </div>
      </div>
      {/* ====================Chef=================== */}
      <div className={cx("chef")}>
        <div className={cx("box")}>
          <div className={cx("heading")}>
            <span>Alex Doe</span>
            <h1>Siêu đầu bếp</h1>
            <img
              src={require("../../../assets/img/separator.png")}
              alt="separator"
            />
          </div>
          <p>
            Maria là một đầu bếp bánh ngọt gốc La Mã, người đã dành 15 năm ở
            thành phố Rome để hoàn thiện kỹ năng thủ công và những sáng tạo đặc
            biệt của mình.
          </p>
          <div className={cx("flex-btn")}>
            <Btn
              href={"/shop"}
              style={{
                width: "fit-content",
              }}
              value="Khám phá ngay"
            />
            <Btn
              href={"/"}
              style={{
                width: "fit-content",
              }}
              value="Trang chủ"
            />
          </div>
        </div>
        <div className={cx("box")}>
          <img src={require("../../../assets/img/ceaf.png")} alt="chef" />
        </div>
      </div>
      {/* ====================Our Story=================== */}
      <div className={cx("story")}>
        <div className={cx("heading")}>
          <h1>Câu chuyện của chúng tôi</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        <p>

          Ngày xưa, trong ký ức thơ ấu của người sáng lập, hình ảnh đuổi theo chiếc xe bán kem đã thôi thúc một ước mơ. <br />
          Dẫn dắt bởi kỷ niệm, họ mơ tưởng về việc tạo ra một ốc đảo, nơi mỗi ngụm kem đều tái hiện niềm vui trong những ngày<br />
          thơ ấu không lo lắng. Từ ước mơ ấy, cửa hàng kem trực tuyến của chúng tôi ra đời — nơi gia đình và bạn bè cùng nhau thưởng <br />
          thức khoảnh khắc vui vẻ. Mỗi hương vị kể lên một câu chuyện về đam mê và sự khéo léo, gắn kết chúng ta với những khoảnh khắc <br />
          ngọt ngào trong cuộc sống. Chúng tôi tiếp tục truyền đi niềm vui qua từng đơn hàng, lan truyền phép màu của sự hạnh phúc đông lạnh, <br />
          từng miếng kem một.
        </p>
        <Btn
          href={"/home"}
          style={{
            width: "fit-content",
          }}
          value="Dịch vụ"
        />
      </div>
      {/* ====================Our Team=================== */}
      <div className={cx("team")}>
        <div className={cx("heading")}>
          <span>Đội ngũ nhân viên</span>
          <h1>Nhân viên chất lượng và có niềm đam mê</h1>
          <img
            src={require("../../../assets/img/separator-img.png")}
            alt="Separator"
          />
        </div>
        <div className={cx("box-container")}>
          <div className={cx("box")}>
            <img
              src={require("../../../assets/img/team-1.jpg")}
              className={cx("img")}
              alt="Team Member"
            />
            <div className={cx("content")}>
              <img
                src={require("../../../assets/img/shape-19.png")}
                alt="Shape"
                className={cx("shap")}
              />
              <h2>Tran Ngo Gia Bao</h2>
              <p>Người sáng lập</p>
            </div>
          </div>
          <div className={cx("box")}>
            <img
              src={require("../../../assets/img/team-6.jpg")}
              className={cx("img")}
              alt="Team Member"
            />
            <div className={cx("content")}>
              <img
                src={require("../../../assets/img/shape-19.png")}
                alt="Shape"
                className={cx("shap")}
              />
              <h2>Huynh Sinh Truong</h2>
              <p>Đồng sáng lập</p>
            </div>

          </div>
          <div className={cx("box")}>
            <img
              src={require("../../../assets/img/team-3.jpg")}
              className={cx("img")}
              alt="Team Member"
            />
            <div className={cx("content")}>
              <img
                src={require("../../../assets/img/shape-19.png")}
                alt="Shape"
                className={cx("shap")}
              />
              <h2>Dang Quoc Duy</h2>
              <p>Đồng sáng lập</p>
            </div>
          </div>
          <div className={cx("box")}>
            <img
              src={require("../../../assets/img/team-4.jpg")}
              className={cx("img")}
              alt="Team Member"
            />
            <div className={cx("content")}>
              <img
                src={require("../../../assets/img/shape-19.png")}
                alt="Shape"
                className={cx("shap")}
              />
              <h2>Ma Seo Sau</h2>
              <p>Đồng sáng lập</p>
            </div>
          </div>
        </div>
      </div>
      {/* ===================Standers==================== */}
      <div className={cx("standers")}>
        <div className={cx("detail")}>
          <div className={cx("heading")}>
            <h1>Tiêu chuẩn của chúng tôi</h1>
            <img
              src={require("../../../assets/img/separator.png")}
              alt="Separator"
            />
          </div>
          <ol>
            <li>
              <h2>
                {" "}
                <FontAwesomeIcon icon={faMedal} className={cx("icon-style")} />
                Thành phần chất lượng:{" "}
              </h2>
              <p>
                Đảm bảo sử dụng nguyên liệu tươi, cao cấp để đạt được hương vị đậm đà
                và kết cấu mịn màng của kem tươi.
              </p>
            </li>
            <li>
              <h2>
                {" "}
                <FontAwesomeIcon icon={faMedal} className={cx("icon-style")} />
                Xử lý vệ sinh:{" "}
              </h2>
              <p>
                Tuân thủ các tiêu chuẩn vệ sinh nghiêm ngặt trong suốt quá trình sản xuất
                để đảm bảo sản phẩm cuối cùng an toàn và không có chất gây ô nhiễm.
              </p>
            </li>
            <li>
              <h2>
                {" "}
                <FontAwesomeIcon icon={faMedal} className={cx("icon-style")} />
                Quá trình làm kem nhất quán:
              </h2>
              <p>
                Thực hiện quy trình khuấy chính xác để duy trì độ kem ổn định và ngăn
                chặn sự hình thành tinh thể đá trong mỗi mẻ kem tươi.
              </p>
            </li>
            <li>
              <h2>
                {" "}
                <FontAwesomeIcon icon={faMedal} className={cx("icon-style")} />
                Kiểm soát nhiệt độ nghiêm ngặt:
              </h2>
              <p>
                Theo dõi và kiểm soát các điều kiện nhiệt độ một cách tỉ mỉ để duy
                trì tính toàn vẹn của kem và đạt được kết cấu cũng như hương vị tối ưu.
              </p>
            </li>
            <li>
              <h2>
                <FontAwesomeIcon icon={faMedal} className={cx("icon-style")} />
                Công nghệ thủ công{" "}
              </h2>
              <p>
                Áp dụng các kỹ thuật thủ công để tạo ra trải nghiệm kem tươi độc đáo và
                thú vị, đáp ứng các tiêu chuẩn cao nhất về hương vị và cảm giác thích thú.
              </p>
            </li>
          </ol>
        </div>
      </div>

      {/* ===================Testimonial==================== */}
      <div className={cx("testimonial")}>
        <div className={cx("heading")}>
          <h1>Lời chứng thực</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="Separator"
          />
        </div>
        <div className={cx("testimonial-container")}>
          <div className={cx("slide-row")} id="slide">
            <div className={cx("slide-col")}>
              <div className={cx("user-text")}>
                <p>
                  Zen Doan là một nhà phân tích kinh doanh, doanh nhân, chủ
                  sở hữu truyền thông và nhà đầu tư. Cô còn được biết đến là
                  tác giả cuốn sách bán chạy nhất.
                </p>
                <h2>Zen</h2>
                <p>Tác giả</p>
              </div>
              <div className={cx("user-img")}>
                <img
                  src={require("../../../assets/img/testimonial (1).jpg")}
                  alt="User img"
                />
              </div>
            </div>
            <div className={cx("slide-col")}>
              <div className={cx("user-text")}>
                <p>
                  Zen Doan là một nhà phân tích kinh doanh, doanh nhân, chủ
                  sở hữu truyền thông và nhà đầu tư. Cô còn được biết đến là
                  tác giả cuốn sách bán chạy nhất.
                </p>
                <h2>Zen</h2>
                <p>Tác giả</p>
              </div>
              <div className={cx("user-img")}>
                <img
                  src={require("../../../assets/img/testimonial (2).jpg")}
                  alt="User img"
                />
              </div>
            </div>
            <div className={cx("slide-col")}>
              <div className={cx("user-text")}>
                <p>
                  Zen Doan là một nhà phân tích kinh doanh, doanh nhân, chủ
                  sở hữu truyền thông và nhà đầu tư. Cô còn được biết đến là
                  tác giả cuốn sách bán chạy nhất.
                </p>
                <h2>Zen</h2>
                <p>Tác giả</p>
              </div>
              <div className={cx("user-img")}>
                <img
                  src={require("../../../assets/img/testimonial (3).jpg")}
                  alt="User img"
                />
              </div>
            </div>
            <div className={cx("slide-col")}>
              <div className={cx("user-text")}>
                <p>
                  Zen Doan là một nhà phân tích kinh doanh, doanh nhân, chủ
                  sở hữu truyền thông và nhà đầu tư. Cô còn được biết đến là
                  tác giả cuốn sách bán chạy nhất.
                </p>
                <h2>Zen</h2>
                <p>Tác giả</p>
              </div>
              <div className={cx("user-img")}>
                <img
                  src={require("../../../assets/img/testimonial (4).jpg")}
                  alt="User img"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("indicator")}>
          <span className={cx("btn")} id={cx("now-active")}></span>
          <span className={cx("btn")} id={cx("")}></span>
          <span className={cx("btn")} id={cx("")}></span>
          <span className={cx("btn")} id={cx("")}></span>
        </div>
      </div>
      {/* ===================Mission==================== */}
      <div className={cx("mission")}>
        <div className={cx("box-container")}>
          <div className={cx("box")}>
            <div className={cx("heading")}>
              <h1>Sứ mệnh của chúng tôi</h1>
              <img
                src={require("../../../assets/img/separator.png")}
                alt="Separator"
              />
            </div>
            <div className={cx("detail")}>
              <div className={cx("img-box")}>
                <img
                  src={require("../../../assets/img/mission.webp")}
                  alt="Mission img"
                />
              </div>
              <div>
                <h2>Socola Mexico</h2>
                <p>
                  Các lớp kẹo dẻo marshmallow có hình dạng - thỏ,
                  gà con và những bông hoa đơn giản - tạo nên một
                  món quà đáng nhớ đựng trong hộp có dây ruy băng
                </p>
              </div>
            </div>
            <div className={cx("detail")}>
              <div className={cx("img-box")}>
                <img
                  src={require("../../../assets/img/mission1.webp")}
                  alt="Mission img"
                />
              </div>
              <div>
                <h2>Vanila với mật ong</h2>
                <p>
                  Các lớp kẹo dẻo marshmallow có hình dạng - thỏ,
                  gà con và những bông hoa đơn giản - tạo nên một
                  món quà đáng nhớ đựng trong hộp có dây ruy băng
                </p>
              </div>
            </div>
            <div className={cx("detail")}>
              <div className={cx("img-box")}>
                <img
                  src={require("../../../assets/img/mission0.jpg")}
                  alt="Mission img"
                />
              </div>
              <div>
                <h2>Chip bạc hà</h2>
                <p>
                  Các lớp kẹo dẻo marshmallow có hình dạng - thỏ,
                  gà con và những bông hoa đơn giản - tạo nên một
                  món quà đáng nhớ đựng trong hộp có dây ruy băng
                </p>
              </div>
            </div>
            <div className={cx("detail")}>
              <div className={cx("img-box")}>
                <img
                  src={require("../../../assets/img/mission2.webp")}
                  alt="Mission img"
                />
              </div>
              <div>
                <h2>Mâm xôi Sorbat</h2>
                <p>
                  Các lớp kẹo dẻo marshmallow có hình dạng - thỏ,
                  gà con và những bông hoa đơn giản - tạo nên một
                  món quà đáng nhớ đựng trong hộp có dây ruy băng
                </p>
              </div>
            </div>
          </div>
          <div className={cx("box")}>
            <img
              src={require("../../../assets/img/form.png")}
              alt="temp"
              className={cx("img")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
