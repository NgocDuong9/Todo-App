import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserServices";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  const handleEditUser = () => {};
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Job</label>
                <input
                  type="text"
                  className="form-control"
                  value={job}
                  onChange={(e) => {
                    setJob(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
