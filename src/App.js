import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MainPage from "./MainPage";
import HomePage from "./Homepage";
import FavoritePage from "./FavoritePage";
import UsedGifsPage from "./UsedGifsPage";
import Logout from "./Logout";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<LoginPage />}></Route>
        <Route path="/signup" exact element={<SignupPage />}></Route>
        <Route path="/favorite" exact element={<FavoritePage />}></Route>
        <Route path="/usedGifs" exact element={<UsedGifsPage />}></Route>
        <Route path="/search" exact element={<MainPage />}></Route>
        <Route path="/logout" exact element={<HomePage />}></Route>
        <Route path="/" exact element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
