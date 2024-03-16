import { useState, useEffect } from "react";
import className from "classnames/bind";
import style from "./Message.module.scss";
import Swal from "sweetalert2";
import { Btn, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
const cx = className.bind(style);
function Message() {
  const [mesages, setMessages] = useState([]);
  const [loading, setLoaing] = useState(false);
  const currentURL = window.location.pathname;
  const url = currentURL.includes("seller")
  ? "/seller/message"
  : "/admin/message";
  const getMessages = async () => {
    setLoaing(true);
    await axiosClient
      .get(url)
      .then(({ data }) => {
        setMessages(data);
        setLoaing(false);
      })
      .catch((error) => console.log(error));
  };
  const handleDeleteMessage = (messageId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`${url}/${messageId}`)
          .then(({ data }) => {
            setMessages(prevMessages => prevMessages.filter((message) => message.id !== messageId ));
            Swal.fire({
              title: "Deleted!",
              text: "This message was deleted!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>unread message</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      <div className={cx("box-container")}>
        {!loading && (
          <>
            {mesages.length > 0 ? (
              mesages.map((message) => (
                <div className={cx("box")}>
                  <h3 className={cx("name")}>{message.user_name}</h3>
                  <h4>{message.subbject}</h4>
                  <p>{message.message}</p>
                  <form action="" method="post">
                    <Btn
                      value={"delete this message"}
                      style={{ width: "fit-content" }}
                      onclick={() => handleDeleteMessage(message.id)}
                    />
                  </form>
                </div>
              ))
            ) : (
              <div className={cx("empty")}>
                <p>no unread message yet!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
