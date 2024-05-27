import className from "classnames/bind";
import { useState } from "react";
import style from "./AddProduct.module.scss";
import { Btn } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
import Alert from "../../../components/Alert/Alert";
import webSocketService from "../../../webSocketService";
const cx = className.bind(style);

function AddProduct() {
  const { currentUser } = useStateContext();
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "bắp",
    productDetail: "",
    stock: "",
    image: "",
    image_url: "",
    status: "",
  });
  const onImageChoose = (e) => {
    if (errors?.image) {
      setErrors({ ...errors, image: "" });
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProduct({
        ...product,
        image: file,
        image_url: reader.result,
      });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  const storeProduct = async (payload) => {
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    await axiosClient
      .post("/seller/product", payload)
      .then((res) => {
        webSocketService.send('/app/updateProduct', res.data)
        setProduct({
          name: "",
          price: "",
          category: "bắp",
          productDetail: "",
          stock: "",
          image: "",
          image_url: "",
          status: "",
        });
        Alert("success", "Thêm sản phẩm thành công");
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
        }
      });
  };
  const addProduct = () => {
    const payload = { ...product, status: "đang bán", sellerId: currentUser.id };
    storeProduct(payload);
  };
  const saveAsDraf = () => {
    const payload = {
      ...product,
      status: "chưa bán",
      sellerId: currentUser.id,
    };
    storeProduct(payload);
  };
  const inputField = cx("input-field");
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Thêm sản phẩm</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      <div className={cx("form-container")}>
        <form
          action=""
          method="post"
          encType="multipart/form-data"
          className={cx("add-product")}
        >
          <div className={inputField}>
            <p>
              Tên sản phẩm<span>*</span>
            </p>
            <input
              className={cx("box")}
              type="text"
              name="name"
              maxLength={100}
              placeholder="Nhập tên sản phẩm"
              onChange={(e) => {
                if (errors?.name) {
                  setErrors({ ...errors, name: "" });
                }
                setProduct({ ...product, name: e.target.value });
              }}
              value={product.name}
            ></input>
            {errors?.name ? (
              <div className={cx("error")}>{errors?.name}</div>
            ) : null}
          </div>
          <div className={inputField}>
            <p>
              Giá sản phẩm<span>*</span>
            </p>
            <input
              className={cx("box")}
              type="number"
              name="price"
              maxLength={100}
              placeholder="Nhập giá sản phẩm"
              required
              onChange={(e) => {
                if (errors?.price) {
                  setErrors({ ...errors, price: "" });
                }
                setProduct({ ...product, price: Number(e.target.value) });
              }}
              value={product.price}
            ></input>
            {errors?.price ? (
              <div className={cx("error")}>{errors?.price}</div>
            ) : null}
          </div>
          <div className={inputField}>
            <p>
              Phân loại<span>*</span>
            </p>
            <select
              name="category"
              className={cx("box")}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              value={product.category}
            >
              <option value="bắp">Bắp</option>
              <option value="dừa">Dừa</option>
              <option value="socola">Socola</option>
              <option value="dâu">Dâu</option>
            </select>
          </div>
          <div className={inputField}>
            <p>
              Chi tiết sản phẩm<span>*</span>
            </p>
            <textarea
              className={cx("box")}
              name="description"
              maxLength={1000}
              placeholder="Nhập chi tiết sản phẩm"
              required
              onChange={(e) => {
                if (errors?.productDetail) {
                  setErrors({ ...errors, productDetail: "" });
                }
                setProduct({ ...product, productDetail: e.target.value });
              }}
              value={product.productDetail}
            ></textarea>
            {errors?.productDetail ? (
              <div className={cx("error")}>{errors?.productDetail}</div>
            ) : null}
          </div>
          <div className={inputField}>
            <p>
              Số lượng sản phẩm<span>*</span>
            </p>
            <input
              className={cx("box")}
              type="number"
              name="stock"
              maxLength={10}
              min={0}
              max={9999999999}
              placeholder="Nhập số lượng sản phẩm"
              required
              onChange={(e) => {
                if (errors?.stock) {
                  setErrors({ ...errors, stock: "" });
                }
                setProduct({ ...product, stock: Number(e.target.value) });
              }}
              value={product.stock}
            ></input>
            {errors?.stock ? (
              <div className={cx("error")}>{errors?.stock}</div>
            ) : null}
          </div>
          <div className={inputField}>
            <p>
              Ảnh sản phẩm<span>*</span>
            </p>
            <div className={cx("product-img-box")}>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt="Image"
                  className={cx("img-choose")}
                />
              )}
              {!product.image_url && (
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
                Thay đổi
              </button>
            </div>
            {errors?.image ? (
              <div className={cx("error")}>{errors?.image}</div>
            ) : null}
          </div>
          <div className={cx("flex-btn")}>
            <Btn value="Thêm sản phẩm" onclick={addProduct} />

            <Btn value="Lưu nháp" onclick={saveAsDraf} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
