import React from "react";
import Button from "react-bootstrap/Button";

function Edit({ renderPage }) {
  const changePage = () => {
    renderPage(false);
  };

  return (
    <div>
      {" "}
      <Button onClick={changePage}>Form</Button>
    </div>
  );
}

export default Edit;
