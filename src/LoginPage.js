import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import MainPage from "./MainPage";
import Navbar from "./NavBar";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowProceed, setAllowProceed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
    } 

    console.log("res", res);
    //Response {type: 'cors', url: 'http://localhost:3000/login', redirected: false, status: 200, ok: true, …}

    console.log("data", data);
    //{message: 'Logged in successfully'}

    if (data.signedIn) {
      setAllowProceed(true);
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div>
      {!allowProceed && (
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h1"
            align="center"
            style={{ marginTop: "20px", color: "#203354" }}
          >
            Login Here
          </Typography>
          <Typography
            variant="h5"
            style={{ marginTop: "20px", marginLeft: "30px" }}
          >
            Email:
          </Typography>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={{ marginLeft: "30px", height: "40px", fontSize: "20px" }}
          />
          <Typography
            variant="h5"
            style={{ marginTop: "20px", marginLeft: "30px" }}
          >
            Password:
          </Typography>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={{ marginLeft: "30px", height: "40px", fontSize: "20px" }}
          />
          <br />
          <br />
          <br />

          <button
            style={{
              marginLeft: "30px",
              height: "40px",
              width: "100px",
              fontSize: "20px",
              backgroundColor: "#203354",
              color: "#fff",
            }}
          >
            Login
          </button>
          <Typography
            variant="h5"
            style={{
              marginTop: "20px",
              marginLeft: "30px",
              fontStyle: "italic",
              color: "#b71c1c",
            }}
          >
            {errorMessage}
          </Typography>
        </form>
        // &&
        // <h1>{errorMessage}</h1>
      )}
      {allowProceed && <Navbar email={email} />}
      {allowProceed && (
        <Typography
          variant="h1"
          align="center"
          style={{
            marginTop: "200px",
            fontStyle: "italic",
            color: "#203354",
          }}
        >
          Begin your GIF journey.
        </Typography>
      )}
    </div>
  );
};

export default LoginPage;
