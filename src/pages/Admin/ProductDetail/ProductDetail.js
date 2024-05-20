import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import className from "classnames/bind";
import style from "./ProductDetail.module.scss";
import { Btn, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
const cx = className.bind(style);

function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const currentPath = window.location.pathname;
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(
        currentPath.includes("seller")
          ? `/seller/product/${id}`
          : `/admin/product/${id}`
      )
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Sản phẩm của bạn</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className={cx("box-container")}>
          {/*Select product from database */}
          <div className={cx("box")}>
            <div
              className={cx("status")}
              style={{
                color: product.status === "active" ? "limegreen" : "coral",
              }}
            >
              {product.status}
            </div>
            {/*-----product image-----*/}

            <img alt={product.name} className={cx("image")} src={product.image} />
            {/*-----product price-----*/}
            <div className={cx("price")}>{product.price}VNĐ</div>
            <div className={cx("title")}>{product.name}</div>
            <div className={cx("content")}>
              {/*Product detail from db */}
              {product.productDetail}
            </div>
            <div className={cx("flex-btn")}>
              <Btn
                style={{
                  width: "40%",
                }}
                href={`/seller/editproduct/${id}`}
                value={"Sửa"}
              />

              <Btn
                style={{
                  width: "40%",
                }}
                href={currentPath.includes('seller') ? "/seller/viewproduct" : '/admin/viewproduct'}
                value={"Quay lại"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
