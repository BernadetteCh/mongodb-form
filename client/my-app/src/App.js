import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/InputForm";
import Edit from "../src/components/Edit";

function App() {
  const [changePAge, setChangePage] = useState(false);

  const renderPage = (boolean) => {
    setChangePage(boolean);
  };

  if (changePAge === true) {
    return <Edit renderPage={renderPage} />;
  } else {
    return <Form renderPage={renderPage} />;
  }
}

export default App;
