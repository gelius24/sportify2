require("dotenv").config();
const express = require("express");
const fetchers = require("./fetchers");
const QueryString = require("qs");

const app = express();
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECTION;

app.use(express.static("./public"));
app.use(express.json());

// Connexion & obtenir code à échanger contre TOKEN dans QUERY
app.get("/login", (req, res) => {
  var scope =
    "user-read-private user-read-email user-top-read user-read-recently-played user-library-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      QueryString.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: `${redirect_uri}/getToken`,
      })
  );
});

// Redirigé ici après connexion avec le code dans query
app.get("/getToken", async (req, res) => {
  const { access_token, refresh_token } = await fetchers.getToken(
    req.query.code
  );
  // Obtenir les data du comptes
  await fetchers
    .fetchProfile(access_token)
    .then(fetchers.fetchUserTopSongs(access_token))
    .then(fetchers.fetchRecentSongs(access_token))
    .then(fetchers.fetchNewRelease(access_token))
    .then(fetchers.fetchUserPlaylists(access_token))
    .then(fetchers.fetchPopularPlaylist(access_token))
    .then(fetchers.fetchUserAlbums(access_token));

  res.redirect("/home.html");
});

app.listen(5000, console.log("écoute sur port 5000..."));
