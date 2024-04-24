import classNames from "classnames/bind";
import styles from "./SearchItemResult.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function SearchItemResult({ data, onClick }) {
  return (
    <div onClick={() => onClick(data)} className={cx("wrapper")}>
      <img
        className={cx("avatar")}
        src={data.image_url}
        alt={"image product"}
      />
      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>{data.name}</span>
        </h4>
        <span className={cx("price")}>{data.price}VNĐ</span>
      </div>
    </div>
  );
}

export default SearchItemResult;
