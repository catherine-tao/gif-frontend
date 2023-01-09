import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./index.css";

const Navbar = (email) => {
  return (
    <nav className="navbar">
      <AppBar component="nav" position="fixed" style={{ background: '#203354' }}>
        <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, color:"#fff" }}>
            GIF Tracker
          </Typography>
          <div className="links">
        <Link to="/search" state={email}>
          Find GIFs
        </Link>
        <Link to="/favorite" state={email}>
          Favorited GIFs
        </Link>
        <Link to="/usedGifs" state={email}>
          Used GIFs
        </Link>
        <Link to="/logout">Logout</Link>
      </div>
        </Toolbar>
      </AppBar>
      {console.log("navebar email", email)}

     
    </nav>
  );
};

export default Navbar;
