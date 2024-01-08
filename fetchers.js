require("dotenv").config();
const {writeFileSync} = require('fs');
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECTION;

// GET TOKEN in exchange of a code
async function getToken(code){
    const params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${redirect_uri}/getToken`);

    var data = await fetch("https://accounts.spotify.com/api/token",{
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa(client_id + ":" + process.env.CLIENT_SECRET),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params
    })
    var {access_token, refresh_token} = await data.json();
    return {access_token, refresh_token};
}

// GET PROFILE INFO
async function fetchProfile(token){
    var result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    var profile = await result.json();
    writeFileSync('./public/data/profileData.js', `const profile = ${JSON.stringify(profile)}; export default profile`);
    return profile;
}

// GET users TOP songs
async function fetchUserTopSongs(token){
    var data = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=6", 
    {method: "GET",
    headers: {Authorization: `Bearer ${token}`}
    })

    var topSongs = await data.json();
    writeFileSync('./public/data/userTopSongs.js', `const userTopSongs = ${JSON.stringify(topSongs)}; export default userTopSongs`);
    // return topSongs;
}

// GET recently played songs
async function fetchRecentSongs(token){
    var data = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=6', {
    method:"GET",
    headers: {Authorization: `Bearer ${token}`}
    })
    var recentsSongs = await data.json();
    writeFileSync('./public/data/recentSongs.js', `const recentSongs = ${JSON.stringify(recentsSongs)}; export default recentSongs`);
}

// GET new release
async function fetchNewRelease(token) {
    var data = await fetch ('https://api.spotify.com/v1/browse/new-releases?limit=6', {
        method:"GET",
        headers: {Authorization: `Bearer ${token}`}
    })
    var newReleases = await data.json();
    writeFileSync('./public/data/newReleases.js', `const newReleases = ${JSON.stringify(newReleases)}; export default newReleases`);
}

// GET user playlist
async function fetchUserPlaylists(token) {
    const data = await fetch('https://api.spotify.com/v1/me/playlists', {
        method:"GET",
        headers: {Authorization: `Bearer ${token}`}
    })
    const playlist = await data.json();
    writeFileSync('./public/data/userPlaylists.js', `const userPlaylists = ${JSON.stringify(playlist)}; export default userPlaylists`);
}

// saved albums 
async function fetchUserAlbums(token) {
    const data = await fetch('https://api.spotify.com/v1/me/albums?limit=8', {
        method:"GET",
        headers: {Authorization: `Bearer ${token}`}
    })
    const savedAlbum = await data.json();
    writeFileSync('./public/data/userAlbums.js', `const userAlbums = ${JSON.stringify(savedAlbum)}; export default userAlbums`);
}

// popular playlists
async function fetchPopularPlaylist(token) {
    var data = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=6', {
        method:"GET",
        headers: {Authorization: `Bearer ${token}`}
    })
    const popularPlaylist = await data.json();
    writeFileSync('./public/data/popularPlaylists.js', `const popularPlaylists = ${JSON.stringify(popularPlaylist)}; export default popularPlaylists`);
}

module.exports = {
    getToken,
    fetchProfile, 
    fetchUserTopSongs, 
    fetchRecentSongs, 
    fetchNewRelease,
    fetchUserPlaylists,
    fetchPopularPlaylist,
    fetchUserAlbums
}