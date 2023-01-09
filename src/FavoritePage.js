import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useLocation } from "react-router-dom";
import Navbar from "./NavBar";

const FavoritePage = (email, password) => {
  const apiKey = "qKP5vNFjmVmMx59gBtlIb4u9WxK3gvQu";
  const [favoritedGIFs, setFavoritedGIFs] = useState([]);
  const [favoritedGIFsURL, setFavoritedGIFsURL] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const userEmail = location.state?.email;

  console.log("userEmail", userEmail);
  const handleFavouriteClick = async () => {
    console.log("userEmail.", userEmail);

    const res = await fetch(`http://localhost:3000/login/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const favoritedGIFsArray = await res.json();
    console.log(
      "toString(favoritedGIFsArray)",
      favoritedGIFsArray.favoritedArray
    );

    var urlArray = [];
    for (var i = 0; i < favoritedGIFsArray.favoritedArray.length; i++) {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/${favoritedGIFsArray.favoritedArray[i]}?api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log("details data", data);

      urlArray.push({
        gifUrl: data.data.images.fixed_height.url,
        gifId: favoritedGIFsArray.favoritedArray[i],
      });
      console.log("data.url", data.data.images.fixed_height.url);
    }
    console.log("urlArray2", urlArray);

    setFavoritedGIFsURL(urlArray);
  };

  useEffect(() => {
    handleFavouriteClick();
    setIsLoading(false);
  }, []);

  const handleUnfavouriteClick = async (gifID) => {
    console.log("useremail click", userEmail);
    const res = await fetch(
      `http://localhost:3000/search/unfavorite/${gifID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ email: userEmail }),
      }
    );

    console.log("res", res);
    handleFavouriteClick();
  };


  const loadGifs = () => {
    if (!isLoading) {
      return favoritedGIFsURL.map((gif) => {
        return (
          <div key={gif.gifID} className="picture">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <img src={gif.gifUrl} />
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => handleUnfavouriteClick(gif.gifId)}
                  variant="outlined"
                  sx={{ backgroundColor: "#203354", color: "#fff" }}
                >
                  Unfavorite
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <Navbar email={userEmail} />
      <h1 style={{ marginLeft: "30px" }}> Your Favorite GIFs</h1>
      {console.log("userEmail", userEmail)}
      {loadGifs()}
    </div>
  );
};

export default FavoritePage;
