import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import User from "../components/User";
import "../App.css";

function Edit({ renderPage }) {
  const [apiUrl] = useState("http://localhost:8000/data");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch(apiUrl);
      const response = await data.json();

      setData(response);
    }
    getData();
  }, [apiUrl]);

  const changePage = () => {
    renderPage(false);
  };
  const goToEditPage = (id, userId) => {
    renderPage(id, userId);
  };
  const deleteRequest = async (id, index) => {
    await fetch(`http://localhost:8000/data/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    let newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>SecondName</th>
            <th>Email</th>
          </tr>
        </thead>
        {data.map((user, index) => {
          return (
            <User
              user={user}
              key={index}
              myKey={index}
              deleteRequest={deleteRequest}
              goToEditPage={goToEditPage}
            />
          );
        })}
      </table>
      <Button onClick={changePage} className="mt-5">
        Go Back To Form
      </Button>
    </div>
  );
}

export default Edit;
