import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/Context";
import AppRoutes from "./components/Routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const dataUserRedux = useSelector((state) => state.user.account);
  console.log(dataUserRedux);
  const { user, loginConText } = useContext(UserContext);
  // console.log(user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginConText(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
