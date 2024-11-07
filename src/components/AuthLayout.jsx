import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
(1)protection mechanism for pages/routes!
(2) 2 params :- {children,reqAuth=true}
(3){authslice=state} ie, we access the state present in the store!
(4)useEffecct dependencies :- navigate,authStatus,and reqAuth
(5)loader,setLoader => usestate!  and setLoader (false)
(6)logic  in conditional statement! :-
(a)(reqAuth && authStatus !== reqAuth) {navigate "/login"}
(b)(!reqAuth && authStatus !== reqAuth) {navigate "/"}*/

export default function Protected({ children, reqAuth = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState("");
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    /*case-1 true && false(loged-Out) !== true ::: true && true =>
      Navigation to Login Page!*/

    if (reqAuth && authStatus !== reqAuth) {
      navigate("/login");
    } else if (!reqAuth && authStatus !== reqAuth) {
      /*case-2 false && true(loged-IN) !== true  ::: false && false =>navigation to homePage*/

      navigate("/");
    }
    setLoader(false);
  }, [navigate, authStatus, reqAuth]);
  return loader ? <h1>"Loading...."</h1> : <>{children}</>;
}
