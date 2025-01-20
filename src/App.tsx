import React from "react";
import { HomePage, DetailPage } from "./pages";
import { Link, Route, Routes } from "react-router";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <div className="button">
          <Link to="/">Home</Link>{" "}
        </div>
        <div className="button">
          <Link to="/detail">About</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
