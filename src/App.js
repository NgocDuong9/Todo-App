import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

import { useEffect } from "react";
import AppRoutes from "./components/Routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleReFresh } from "./redux/actions/userAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleReFresh());
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
