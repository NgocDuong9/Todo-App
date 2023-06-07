import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Home from "../Home/Home";
import TableUsers from "../TableUsers";
import PrivateRoutes from "./PrivateRoutes";
import Notfound from "./Notfound";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <PrivateRoutes path="/users">
          <TableUsers />
        </PrivateRoutes> */}

        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
