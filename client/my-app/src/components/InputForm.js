import React, { useState } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function InputForm({ renderPage }) {
  const [user, setUser] = useState({
    firstName: "",
    secondName: "",
    email: "",
  });
  // function handleInput(e) {
  //   console.log(e.target.name);
  //   const input = e.target.name;
  //   setUser({ firstName: input.value });
  //   console.log(user.firstName);
  // }

  function changePage() {
    renderPage(true);
  }
  function saveInput(e) {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/userData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });

    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
    let datajson = await response.json();
    console.log(datajson);
  }
  return (
    <div className="form">
      <h1>Exercise MongoDB, Express & React</h1>{" "}
      <Form>
        <Form.Group className="mb-3 firstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            value={user.firstName}
            name="firstName"
            placeholder="Please Enter your FirstName"
            onChange={saveInput}
          />
        </Form.Group>

        <Form.Group className="mb-3 secondName">
          <Form.Label>SecondName</Form.Label>
          <Form.Control
            type="text"
            name="secondName"
            value={user.secondName}
            placeholder="Please Enter your SecondName"
            onChange={saveInput}
          />
        </Form.Group>

        <Form.Group className="mb-3 email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Please Enter your email"
            onChange={saveInput}
          />
        </Form.Group>

        <Form.Text className="text-muted">
          We'll never share your data with anyone else.
        </Form.Text>
        <Button
          variant="primary"
          type="submit"
          className="submitButton d-block"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <Button onClick={changePage}>Edit</Button>
    </div>
  );
}

export default InputForm;
