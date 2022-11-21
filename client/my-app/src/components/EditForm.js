import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditForm({ userid }) {
  const [apiUrl] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      //   const id = userid.toString();

      const response = await fetch(`http://localhost:8000/data/${userid}`);
      const data = await response.json();

      if (!response.ok) {
        console.log(`Error: ${response.status}`);
      }
      setForm(data);
    }

    fetchData();
  }, [apiUrl, userid]);

  const updateForm = (e) => {
    return setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // console.log(form);
  // console.log(userid);

  async function sayHello(e) {
    let response = await fetch(`http://localhost:8000/data/${userid}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: form.firstName,
        secondName: form.secondName,
        email: form.email,
      }),
    });

    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
  }

  return (
    <div className="form">
      <Form>
        <Form.Group className="mb-3 firstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            value={form.firstName}
            name="firstName"
            placeholder="Please Enter your FirstName"
            onChange={updateForm}
          />
        </Form.Group>

        <Form.Group className="mb-3 secondName">
          <Form.Label>SecondName</Form.Label>
          <Form.Control
            type="text"
            name="secondName"
            value={form.secondName}
            placeholder="Please Enter your SecondName"
            onChange={updateForm}
          />
        </Form.Group>

        <Form.Group className="mb-3 email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            placeholder="Please Enter your email"
            onChange={updateForm}
          />
        </Form.Group>

        <Form.Text className="text-muted">
          We'll never share your data with anyone else.
        </Form.Text>
        <Button onClick={sayHello} type="submit">
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default EditForm;
