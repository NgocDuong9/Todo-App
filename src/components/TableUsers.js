import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserServices";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    //call apis
    //dry
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await fetchAllUser();
    if (res && res.data) {
      setListUsers(res.data);
    }
  };
  console.log(listUsers);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
                </tr>
              );
            })}
        </tbody>
      </Table>
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
