import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserServices";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import _ from "lodash";
import ModalConfirm from "./ModalComfirm";
import { debounce } from "lodash";
import "./TableUsers.scss";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    //call apis
    //dry
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      // console.log(res);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };
  // console.log(listUsers);
  const handlePageClick = (event) => {
    console.log(event);
    getUsers(+event.selected + 1);
  };

  const [isCheckModalSHow, setIsCheckModalSHow] = useState(false);
  const [isCheckModalEdit, setIsCheckModalEdit] = useState(false);
  const [isCheckModalConfirm, setIsCheckModalConfirm] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("id");
  const [sortField, setSortField] = useState("asc");

  const handleEditUser = (user) => {
    // console.log(user);
    setDataUserEdit(user);
    setIsCheckModalEdit(true);
  };

  const handleClose = () => {
    setIsCheckModalSHow(false);
    setIsCheckModalEdit(false);
    setIsCheckModalConfirm(false);
  };
  const handleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handlePutUpdateUser = (user) => {
    let cloneUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => (item.id = user.id));
    cloneUser[index].first_name = user.first_name;
    setListUsers(cloneUser);
  };

  const handleDeleteUser = (user) => {
    setIsCheckModalConfirm(true);
    setDataUserDelete(user);
  };
  const handleDeleteUserFormModal = (user) => {
    let cloneUser = _.cloneDeep(listUsers);
    cloneUser = cloneUser.filter((item) => item.id !== user.id);
    setListUsers(cloneUser);
  };
  const handleSortTable = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneUser = _.cloneDeep(listUsers);
    cloneUser = _.orderBy(cloneUser, [sortBy], [sortField]);

    setListUsers(cloneUser);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneUser = _.cloneDeep(listUsers);
      cloneUser = cloneUser.filter((item) => item.email.includes(term));
      setListUsers(cloneUser);
    } else {
      getUsers(1);
    }
  }, 500);

  return (
    <>
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
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSortTable("id", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSortTable("id", "desc")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSortTable("first_name", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSortTable("first_name", "desc")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        handleEditUser(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteUser(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isCheckModalSHow}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />
      <ModalEditUser
        show={isCheckModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handlePutUpdateUser={handlePutUpdateUser}
      />
      <ModalConfirm
        show={isCheckModalConfirm}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFormModal={handleDeleteUserFormModal}
      />
    </>
  );
};

export default TableUsers;

/* avatar
: 
"https://reqres.in/img/faces/1-image.jpg"
email
: 
"george.bluth@reqres.in"
first_name
: 
"George"
id
: 
1
last_name
: 
"Bluth"*/
