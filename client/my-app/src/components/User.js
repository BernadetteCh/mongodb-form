import React from "react";
import Button from "react-bootstrap/Button";

function User({ user, myKey, deleteRequest }) {
  const deleteUser = (e) => {
    deleteRequest(user._id);
  };

  return (
    <tbody>
      <tr>
        <td>{user.firstName}</td>
        <td>{user.secondName}</td>
        <td>{user.email}</td>
        <Button variant="secondary" onClick={deleteUser}>
          DELETE
        </Button>
      </tr>
    </tbody>
  );
}

export default User;
