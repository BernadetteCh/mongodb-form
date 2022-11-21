import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/InputForm";
import Edit from "../src/components/Edit";
import EditForm from "../src/components/EditForm";

function App() {
  const [changePAge, setChangePage] = useState(false);
  const [editData, setEditData] = useState("");

  const renderPage = (boolean, userId) => {
    setEditData(userId);
    setChangePage(boolean);
  };
  const renderEditPage = (string, userId) => {
    setEditData([string, userId]);
  };

  if (changePAge === true) {
    return <Edit renderPage={renderPage} renderEditPage={renderEditPage} />;
  } else if (changePAge === false) {
    return <Form renderPage={renderPage} renderEditPage={renderEditPage} />;
  } else if (changePAge === "edit") {
    return <EditForm userid={editData} />;
  }
}

export default App;
