import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Register,
  Login,
  Dashboard,
  AddProduct,
  ViewProduct,
  ProductDetail,
  EditProduct,
  Profile,
  UpdateProfile,
  UserAccount,
  Message,
  Order,
  Home,
  OrderClient,
  Cart,
  Favourite,
  ViewOrder,
  Shop,
  View1Product,
  AboutUs,
  Checkout,
  SearchResult,
  Contact,
  UserProfile,
  UpdateUserProfile
} from "./pages";

import { DefaultLayout, GuestLayout, AdminLayout } from "./layouts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Navigate to="/" />,
      },
      {
        path: "/order",
        element: <OrderClient />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/favourite",
        element: <Favourite/>,
      },
      {
        path: "/order/vieworder/:id",
        element: <ViewOrder/>,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/view1product/:productId",
        element: <View1Product />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/searchresult/:keyword",
        element: <SearchResult />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/profile/updateprofile",
        element: <UpdateUserProfile />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/seller/login",
        element: <Login />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/seller",
    element: <AdminLayout />,
    children: [
      {
        path: "/seller/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/seller",
        element: <Navigate to="/seller/dashboard" />,
      },
      {
        path: "/seller/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/seller/viewproduct",
        element: <ViewProduct />,
      },
      {
        path: "/seller/productdetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/seller/editproduct/:id",
        element: <EditProduct />,
      },
      {
        path: "/seller/profile",
        element: <Profile />,
      },
      {
        path: "/seller/updateprofile",
        element: <UpdateProfile />,
      },
      {
        path: "/seller/useraccount",
        element: <UserAccount />,
      },
      {
        path: "/seller/message",
        element: <Message />,
      },
      {
        path: "/seller/order",
        element: <Order />,
      },
     
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/admin/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/admin/viewproduct",
        element: <ViewProduct />,
      },
      {
        path: "/admin/productdetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/admin/editproduct/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        path: "/admin/updateprofile",
        element: <UpdateProfile />,
      },
      {
        path: "/admin/useraccount",
        element: <UserAccount />,
      },
      {
        path: "/admin/staffaccount",
        element: <UserAccount />,
      },
      {
        path: "/admin/message",
        element: <Message />,
      },
      {
        path: "/admin/addstaff",
        element: <Register />,
      },
      {
        path: "/admin/order",
        element: <Order />,
      },
    ],
  },
 
]);

export default router;
