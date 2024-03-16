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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
              title: "Deleted!",
              text: "This user has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Something went wrong",
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
        <h1 className={cx("heading-title")}>registered users</h1>
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
                      user.image
                        ? `http://localhost:8000/${user.image}`
                        : require("../../../assets/img/avt.png")
                    }
                    alt="user image"
                  />
                  <p>
                   {currentPath.includes('seller') ? 'user':'seller' }  name: <span> {user.name} </span>
                  </p>
                  <p>
                  {currentPath.includes('seller') ? 'user':'seller' } email:<span>{user.email} </span>
                  </p>
                  <p>
                  {currentPath.includes('seller') ? 'user':'seller confirmed' } order:<span>{user.orderQuantity} </span>
                  </p>
                  {currentPath.includes("admin") ? (
                    <button
                      className={cx("my-btn")}
                      onClick={() => onDeleteUser(user.id)}
                    >
                      delete
                    </button>
                  ) : null}
                </div>
              ))
            ) : (
              <div className={cx("empty")}>
                <p>no registered user yet!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserAccount;
