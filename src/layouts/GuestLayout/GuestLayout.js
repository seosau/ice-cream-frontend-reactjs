import { Outlet, Navigate } from "react-router-dom";
import style from "./GuestLayout.module.scss";
import className from "classnames/bind";
import { useStateContext } from "../../context/ContextProvider";
const cx = className.bind(style);
function GuestLayout() {
  const { userToken, currentUser } = useStateContext();
  if (userToken) {
    if (currentUser.user_type === "seller") {
      return <Navigate to="/seller" />;
    } else if (currentUser.user_type === "seller") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return (
    <div className={cx("background")}>
      <Outlet />
    </div>
  );
}

export default GuestLayout;
