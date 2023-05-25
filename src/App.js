import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";

function App() {
  const [isCheckModalSHow, setIsCheckModalSHow] = useState(false);
  const handleClose = () => {
    setIsCheckModalSHow(false);
  };

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>
            <b>List Users</b>
          </span>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsCheckModalSHow(true);
            }}
          >
            Add new users{" "}
          </button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew show={isCheckModalSHow} handleClose={handleClose} />
    </div>
  );
}

export default App;
