import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./EditProduct.module.scss";
import { Btn, Loader } from "../../../components";
import Alert from "../../../components/Alert/Alert";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);
function EditProduct() {
  const { id } = useParams();
  const currentPath = window.location.pathname;
  const { currentUser } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    image_url: null,
    productDetail: "",
    status: "",
    stock: "",
  });
  const navigate = useNavigate();
  const onImageChoose = (e) => {
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
  const onEdit = async () => {
    const payload = { ...product };
    const url = currentPath.includes("seller") ? '/seller/product' : '/admin/product';
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    await axiosClient
      .put(`${url}/${id}`, payload)
      .then((res) => {
        navigate(
          currentPath.includes("seller")
            ? "/seller/viewproduct"
            : "/admin/viewproduct"
        );
        Alert("success", "Cập nhật sản phẩm thành công");
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.error);
        }
        Alert("error", "Đã xảy ra lỗi");
      });
  };

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
  const inputField = cx("input-field");
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Cập nhật thông tin sản phẩm</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className={cx("box-container")}>
          {/*select product from db */}
          <div className={cx("form-container")}>
            <form action="" method="post" encType="multipart/form-data">
              <div className={inputField}>
                <p>
                  Trạng thái<span>*</span>
                </p>
                <select
                  name="status"
                  className={cx("box")}
                  onChange={(e) =>
                    setProduct({ ...product, status: e.target.value })
                  }
                  value={product.status}
                >
                  <option value="active">Đang bán</option>
                  <option value="inactive">Chưa bán</option>
                </select>
              </div>
              <div className={inputField}>
                <p>
                  Tên sản phẩm<span>*</span>
                </p>
                <input
                  type="text"
                  name="name"
                  /*fetch name */
                  value={product.name}
                  className={cx("box")}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
              <div className={inputField}>
                <p>
                  Giá sản phẩm<span>*</span>
                </p>
                <input
                  type="number"
                  name="price"
                  /*fetch price */
                  value={product.price}
                  className={cx("box")}
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                />
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
                  <option value="corn">Bắp</option>
                  <option value="coconut">Dừa</option>
                  <option value="chocolate">Socola</option>
                  <option value="strawberry">Dâu</option>
                </select>
              </div>
              <div className={inputField}>
                <p>
                  Chi tiết sản phẩm<span>*</span>
                </p>

                <textarea
                  /*fetch desc */ name="description"
                  className={cx("box")}
                  value={product.productDetail}
                  onChange={(e) =>
                    setProduct({ ...product, productDetail: e.target.value })
                  }
                ></textarea>
              </div>
              <div className={inputField}>
                <p>
                  Số lượng<span>*</span>
                </p>
                <input
                  type="number"
                  name="stock"
                  /*fetch stock */
                  value={product.stock}
                  className={cx("box")}
                  min={0}
                  max={999999999}
                  maxLength={10}
                  onChange={(e) =>
                    setProduct({ ...product, stock: Number(e.target.value) })
                  }
                />
              </div>
              <div className={inputField}>
                <p>
                  Ảnh sản phẩm<span>*</span>
                </p>
                <input
                  type="file"
                  name="product img"
                  /*fetch stock */
                  accept="image/*"
                  className={cx("box")}
                  onChange={onImageChoose}
                />
                {product.image_url ? (
                  <img
                    alt="product img"
                    className={cx("image")}
                    src={product.image_url}
                  />
                ) : <img
                  alt="product img"
                  className={cx("image")}
                  src={product.image}
                />}
                <div className={cx("flex-btn")}>
                  <Btn
                    value={"Cập nhật"}
                    style={{
                      width: "49%",
                    }}
                    onclick={onEdit}
                  />
                  <Btn
                    value={"Quay lại"}
                    style={{ width: "49%", height: "3rem" }}
                    href={
                      currentPath.includes("seller")
                        ? "/seller/viewproduct"
                        : "/admin/viewproduct"
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
