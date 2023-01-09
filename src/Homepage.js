import { Link } from "react-router-dom";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const HomePage = () => {
  const user = localStorage.getItem("token");

  return (
    <div>
      <Typography variant="h1" align="center" style={{ marginTop: "120px" }}>
        GIF Tracker
      </Typography>
      <Typography
        variant="h6"
        align="center"
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        Find and keep track of your favorite and most used GIFs all at once.
      </Typography>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        direction="row"
        style={{ marginTop: "50px" }}
      >
        <Link to="/login">
          <Button
            variant="outlined"
            size="large"
            style={{
              height: "40px",
              width: "100px",
              fontSize: "20px",
              backgroundColor: "#203354",
              color: "#fff",
            }}
          >
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button
            variant="outlined"
            size="large"
            style={{
              height: "40px",
              width: "100px",
              fontSize: "20px",
              backgroundColor: "#203354",
              color: "#fff",
            }}
          >
            Signup
          </Button>
        </Link>
      </Stack>
    </div>
  );
};

export default HomePage;
