import className from "classnames/bind";
import style from "./ProductListItem.module.scss";
import Btn from "../Button/Btn";

const cx = className.bind(style);
function ProductListItem({ item, onDelete, url }) {
  return (
    <div className={cx("box")}>
      {/*-----product image-----*/}
      <img alt={item.name} src={item.image} className={cx("image")} />
      <div
        className={cx("status")}
        style={{ color: item.status === "đang bán" ? "limegreen" : "coral" }}
      >
        {item.status}
      </div>
      {/*-----product price-----*/}
      <div className={cx("price")}>{item.price} VNĐ</div>
      <div className={cx("content")}>
        <img
          alt=""
          src={require("../../assets/img/shape-19.png")}
          className={cx("sharp")}
        />
        <div className={cx("title")}>{item.name}</div>
        <div className={cx("flex-btn")}>
          <Btn
            style={{
              width: "30%",
            }}
            href={
              url.includes("seller")
                ? `/seller/editproduct/${item.id}`
                : `/admin/editproduct/${item.id}`
            }
            value={"Sửa"}
          />

          <Btn
            style={{
              width: "32%",
            }}
            value={"Xóa"}
            onclick={() => onDelete(item.id)}
          />

          <Btn
            style={{
              width: "30%",
            }}
            href={
              url.includes("seller")
                ? `/seller/productdetail/${item.id}`
                : `/admin/productdetail/${item.id}`
            }
            value={"Xem"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
