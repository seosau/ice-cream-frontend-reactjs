import { createContext, useContext } from "react";
import { useState } from "react";
const StateContext = createContext({
  currentUser: {},
  setcurrentUser: () => {},
  userToken: null,
  setUserToken: () => {},
  wishListIds: [],
  setWishListIds: () => {},
  cartIds: [],
  setCartIds: () => {},
});
export const ContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [wishListIds, setWishListIds] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setcurrentUser,
        userToken,
        setUserToken,
        wishListIds,
        setWishListIds,
        cartIds,
        setCartIds,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
