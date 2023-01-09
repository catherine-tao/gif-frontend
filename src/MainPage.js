import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useLocation } from "react-router-dom";

import FavoritePage from "./FavoritePage";
import UsedGifsPage from "./UsedGifsPage";
import Navbar from "./NavBar";

const MainPage = (email, password) => {
  const apiKey = "qKP5vNFjmVmMx59gBtlIb4u9WxK3gvQu";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [foundGIFs, setFoundGIFs] = useState([]);
  const [displayGIFs, setDisplayGIFs] = useState(false);
  const [favouritePage, setFavouritePage] = useState(false);
  const [usedGIFsPage, setUsedGIFsPage] = useState(false);
  const location = useLocation();
  const userEmail = location.state?.email;

  let apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchKeyword}&limit=100`;
  //&limit=25&offset=0&rating=g&lang=en`

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(apiUrl);
    const content = await res.json();
    setFoundGIFs(content.data);

    console.log("res", res);
    //Response {type: 'cors', url: 'http://localhost:3000/login', redirected: false, status: 200, ok: true, …}

    console.log("content", content);
    //{message: 'Logged in successfully'}

    setDisplayGIFs(true);
  };

  //"/:actionType/:gifId"
  const handleFavouriteClick = async (gifID) => {
    console.log("useremail click", userEmail);
    const res = await fetch(`http://localhost:3000/search/favorite/${gifID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email: userEmail }),
    });

    console.log("res", res);
  };

  const handleUsedClick = async (gifID) => {
    const res = await fetch(`http://localhost:3000/search/used/${gifID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email: userEmail }),
    });
  };

  return (
    <div>
      <Navbar email={userEmail} />
      {console.log("userEmail search", userEmail)}

      <form
        onSubmit={handleSubmit}
        style={{ marginLeft: "30px", paddingBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Keyword"
          name="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
          required
          style={{ height: "40px", fontSize: "20px" }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "20px",
            height: "40px",
            width: "100px",
            fontSize: "20px",
            backgroundColor: "#203354",
            color: "#fff",
          }}
        >
          Search
        </button>
      </form>

      {console.log("displayGIFs", displayGIFs)}

      {displayGIFs &&
        foundGIFs.map((gif) => {
          console.log("map gifs", gif);
          return (
            <div key={gif.id} className="picture">
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <img src={gif.images.fixed_height.url}></img>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleFavouriteClick(gif.id)}
                    variant="outlined"
                    sx={{ backgroundColor: "#203354", color: "#fff" }}
                  >
                    Favourite
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    onClick={() => {
                      handleUsedClick(gif.id);
                      navigator.clipboard.writeText(
                        gif.images.fixed_height.url
                      );
                    }}
                    variant="outlined"
                    sx={{ backgroundColor: "#fff", color: "#203354" }}
                  >
                    Use It
                  </Button>
                </Grid>
              </Grid>
            </div>
          );
        })}
    </div>
  );
};

export default MainPage;
