import { Outlet, Navigate } from "react-router-dom";
import { Footer, HomeHeader } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
function DefaultLayout() {
  const { userToken, currentUser } = useStateContext();
  if (userToken) {
    if (currentUser.user_type === "seller") {
      return <Navigate to="/seller" />;
    }
    else if (currentUser.user_type === "admin") {
      return <Navigate to="/admin" />;
    }
  } 
  return (
    <>
      <HomeHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
