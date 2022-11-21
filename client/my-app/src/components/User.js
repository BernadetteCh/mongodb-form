import React from "react";
import Button from "react-bootstrap/Button";

function User({ user, myKey, deleteRequest, goToEditPage }) {
  const deleteUser = (e) => {
    deleteRequest(user._id, myKey);
  };

  const editUser = () => {
    goToEditPage("edit", user._id);
  };

  return (
    <tbody>
      <tr>
        <td>{user.firstName}</td>
        <td>{user.secondName}</td>
        <td>{user.email}</td>
        <td>
          <Button variant="secondary" onClick={deleteUser} type="submit">
            DELETE
          </Button>
          <Button variant="secondary" onClick={editUser}>
            Edit
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

export default User;
