import React from "react";
import "./styles/main.scss"
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import ShowDetails from "./components/ShowDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/details/:id" element={<ShowDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
