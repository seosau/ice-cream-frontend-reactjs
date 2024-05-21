import className from "classnames/bind";
import style from "./UserAccount.module.scss";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient/axios";
import { Loader, Btn } from "../../../components";
import Swal from "sweetalert2";

const cx = className.bind(style);
function UserAccount() {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentPath = window.location.pathname;
  const getAllUsers = async () => {
    const url = currentPath.includes("seller")
      ? "/seller/useraccount"
      : currentPath.includes("useraccount")
        ? "/admin/useraccount"
        : "/admin/staffaccount";
    setLoading(true);
    await axiosClient.get(url).then(({ data }) => {
      setListUsers(data);
      setLoading(false);
    });
  };
  const onDeleteUser = (user_id) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể khôi phục lại",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        setListUsers((prevListUsers) =>
          prevListUsers.filter((user) => user.id !== user_id)
        );
        axiosClient
          .delete(`/admin/deleteuser/${user_id}`, {
            delete: currentPath.includes("useraccount") ? "user" : "seller",
          })
          .then((res) => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Đã xóa người dùng này.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Lỗi",
              text: "Đã có lỗi xảy ra.",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Danh sách người dùng</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      <div className={cx("box-container")}>
        {!loading && (
          <>
            {listUsers.length > 0 ? (
              listUsers.map((user, index) => (
                <div className={cx("box")} key={index}>
                  <img
                    src={
                      user.users.image
                        ? user.users.image
                        : require("../../../assets/img/avt.png")
                    }
                    alt="user image"
                  />
                  <p>
                    Họ tên: <span> {user.users.name} </span>
                  </p>
                  <p>
                    Email:<span>{user.users.email} </span>
                  </p>
                  {
                    currentPath.includes("useraccount") &&
                    <p>
                      Số lượng đã đặt: <span>{user.orderQuantity} </span>
                    </p>
                  }
                  {currentPath.includes("admin") ? (
                    <button
                      className={cx("my-btn")}
                      onClick={() => onDeleteUser(user.id)}
                    >
                      Xóa
                    </button>
                  ) : null}
                </div>
              ))
            ) : (
              <div className={cx("empty")}>
                <p>Không có người dùng nào!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserAccount;
