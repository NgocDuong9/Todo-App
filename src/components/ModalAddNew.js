import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserServices";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateUser } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handAddUser = async () => {
    let res = await postCreateUser(name, job);
    console.log(res);
    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success("A User create success!");
      handleUpdateUser({ id: res.id, first_name: name });
    } else {
      toast.error("An error...");
      //error
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Users</Modal.Title>
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
          <Button variant="primary" onClick={handAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
