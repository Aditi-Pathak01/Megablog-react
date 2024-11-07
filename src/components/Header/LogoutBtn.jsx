import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

//step-1 USING .THEN AND .CATCH (THEN AND CATCH ARE USED ON PROMISES!)

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        //this logout is from the appwrite service
        dispatch(logout()); // this will update the value in the redux store/slice
      })
      .catch((err) => {
        console.error("logout failed:", err);
      });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler} // if written {logoutHandler ()} ? it would immediately call the fx while rendering it .
    >
      LOGOUT
    </button>
  );
}
export default LogoutBtn;

/*step-2 USING ASYNC AWAIT
function logoutBtn() {//
  const dispatch = useDispatch();

  const LogoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (err) {
      throw err;
    }
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler} // if written {logoutHandler ()} ? it would immediately call the fx while rendering it .
    >
      LOGOUT
    </button>
  );
}*/
