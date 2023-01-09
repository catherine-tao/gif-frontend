import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import LoginPage from "./LoginPage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goToLogin, setGoToLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setErrorMessage("Passwords don't match");
      return;
    }

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    console.log("res", res);
    //Response {type: 'cors', url: 'http://localhost:3000/login', redirected: false, status: 200, ok: true, …}

    console.log("data", data);
    //{message: 'Logged in successfully'}

    if (data.userCreated) {
      setGoToLogin(true);
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div>
      {!goToLogin && (
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h1"
            align="center"
            style={{ marginTop: "20px", color: "#203354" }}
          >
            Signup Here
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
          <Typography
            variant="h5"
            style={{ marginTop: "20px", marginLeft: "30px" }}
          >
            Confirm Password:
          </Typography>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
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
            Signup
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
      )}
      {goToLogin && <LoginPage />}
    </div>
  );
};

export default Signup;
