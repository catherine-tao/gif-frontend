import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import Navbar from "./NavBar";

const UsedGifsPage = (email, password) => {
  const apiKey = "qKP5vNFjmVmMx59gBtlIb4u9WxK3gvQu";
  const [usedGIFs, setUsedGIFs] = useState([]);
  const [usedGIFsURL, setUsedGIFsURL] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateUsed, setUpdateUsed] = useState(0);
  const [counter, setCounter] = useState(0);

  const location = useLocation();
  const userEmail = location.state?.email;

  const handleUsedGifsClick = async () => {
    console.log("userEmail.", userEmail);

    const res = await fetch(`https://giftrackerapi.onrender.com/login/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const userInfo = await res.json();

    console.log("userInfo", userInfo);

    var urlAndTimesUsedArray = [];
    for (var i = 0; i < userInfo.usedGifs.length; i++) {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/${userInfo.usedGifs[i].gifId}?api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log("details data", data);

      urlAndTimesUsedArray.push({
        url: data.data.images.fixed_height.url,
        timesUsed: userInfo.usedGifs[i].timesUsed,
        gifId: userInfo.usedGifs[i].gifId,
      });
    }

    setUsedGIFsURL(urlAndTimesUsedArray);
  };

  console.log("HERHEHEHEHHEHE");

  useEffect(() => {
    console.log("herher updateUsed", updateUsed);

    handleUsedGifsClick();
    setIsLoading(false);
  }, [updateUsed]);

  const handleUsedClick = async (gifID) => {
    // setUpdateUsed((count) => count + 1);
    console.log("used");
    const res = await fetch(`http://localhost:3000/search/used/${gifID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email: userEmail }),
    });
    handleUsedGifsClick();
  };

  const handleUnusedClick = async (gifID) => {
    setUpdateUsed((count) => count + 1);
    const res = await fetch(`https://giftrackerapi.onrender.com/search/unused/${gifID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email: userEmail }),
    });
    handleUsedGifsClick();
  };

  const counterIncrease = async (gifID) => {
    setUpdateUsed((count) => count + 1);
    setCounter((count) => count + 1);
  };

  const loadGifs = () => {
    if (!isLoading) {
      return usedGIFsURL.map((gif) => {
        if (gif.timesUsed > 0) {
          return (
            <div key={gif.url} className="picture">
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <img src={gif.url} />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleUnusedClick(gif.gifId)}
                    variant="outlined"
                    sx={{ backgroundColor: "#203354", color: "#fff" }}
                  >
                    Unused
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => {
                      handleUsedClick(gif.gifId);
                      navigator.clipboard.writeText(gif.url);
                    }}
                    variant="outlined"
                    sx={{ backgroundColor: "#fff", color: "#203354" }}
                  >
                    Use It
                  </Button>
                </Grid>
              </Grid>
              <h3>Times Used: {gif.timesUsed} </h3>
            </div>
          );
        }
      });
    }
  };

  return (
    <div>
      <Navbar email={userEmail} />
      <h1 style={{ marginLeft: "30px" }}>Your Used GIFs</h1>
      {console.log("usedGifs", userEmail)}

      {loadGifs()}
    </div>
  );
};

export default UsedGifsPage;
