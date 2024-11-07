import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? null : (
    <div className="min-h-screen flex flex-wrap content-between bg-pink-400 w-screen">
      <div className="w-full block">
        <Header />
        <main>TODO {/* {OUTLET}*/}</main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
