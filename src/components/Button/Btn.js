import className from "classnames/bind";
import style from "./Btn.module.scss";
import { Link } from "react-router-dom";
const cx = className.bind(style);

function Btn({ value, href, style, onclick = () => {} }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onclick();
  };
  return href ? (
    <Link onClick={(e) => handleClick(e)} to={href} className={cx("btn")} style={style}>
      {value}
    </Link>
  ) : (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      className={cx("btn")}
      style={style} 
    >
      {value}
    </button>
  );
}

export default Btn;
