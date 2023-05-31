import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUsers } from "../services/UserServices";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } =
    props;

  const confirmDelete = async () => {
    let res = await deleteUsers(dataUserDelete);
    if (res && +res.statusCode === 204) {
      toast.success("Delete success a user");
      handleDeleteUserFormModal(dataUserDelete);
      handleClose();
    } else {
      toast.error("Err");
      handleClose();
    }
    console.log(res);
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
          <Modal.Title>Delete a Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>This action can't be undone!</h5>
            Do want to delete this user,<b>email = {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
