import profile from "./data/profileData.js";
import userTopSongs from "./data/userTopSongs.js";
import recentSongs from "./data/recentSongs.js";
import newReleases from "./data/newReleases.js"
import userPlaylists from "./data/userPlaylists.js";
import popularPlaylists from "./data/popularPlaylists.js"

function populateUI(profile) {
  document.getElementById("displayName").innerText = profile.display_name;
  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar").appendChild(profileImage);
    document.getElementById("imgUrl").innerText = profile.images[0].url;
  }
  document.getElementById("id").innerText = profile.id;
  document.getElementById("email").innerText = profile.email;
  document.getElementById("uri").innerText = profile.uri;
  document
    .getElementById("uri")
    .setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  document.getElementById("url").setAttribute("href", profile.href);
}

function placeUserTopSongs(data) {
  const images = document.querySelectorAll(".userTopSongs");
  const title = document.querySelectorAll(".userTopSongTitles");
  let i = 0;
  images.forEach((img) => {
    img.setAttribute("src", data.items[i].album.images[2].url);
    title[i].textContent = data.items[i].name;
    i++;
  });
}

function placeRecentSongs(data) {
  var images = document.querySelectorAll(".recent-img");
  var title = document.querySelectorAll(".recent-title");
  var author = document.querySelectorAll(".recent-author");
  let i = 0;
  images.forEach((img) => {
    img.setAttribute("src", data.items[i].track.album.images[0].url);
    title[i].textContent = data.items[i].track.name;
    author[i].textContent = data.items[i].track.artists[0].name;
    i++;
  });
}

function placeNewReleases(data){
  var images = document.querySelectorAll(".release-img");
  var title = document.querySelectorAll(".release-title");
  var author = document.querySelectorAll(".release-author");
  let i = 0;
  images.forEach((img) => {
    img.setAttribute("src", data.albums.items[i].images[1].url);
    title[i].textContent = data.albums.items[i].name
    author[i].textContent = data.albums.items[i].artists[0].name
    i++;
  })
}

function placePopularPlaylist(data){
  var images = document.querySelectorAll(".featuredPlaylist-img");
  var title = document.querySelectorAll(".featuredPlaylist-title");
  var author = document.querySelectorAll(".featuredPlaylist-author");
  let i = 0;
  console.log(data)
  images.forEach((img) => {
    img.setAttribute("src", data.playlists.items[i].images[0].url);
    title[i].textContent = data.playlists.items[i].name
    author[i].textContent = data.playlists.items[i].owner.display_name
    i++;
  })
}

function placePlaylists(data) {
  const biblio = document.querySelector("section.biblio")
  data.items.forEach((playlist) => {
    biblio.insertAdjacentHTML("beforeend", `
    <div class="shelf">
          <img src=${playlist.images[0].url} alt="playlist picture">
          <div class="info">
            <p class="info1">${playlist.name}</p>
            <p class="info2">Playlist * ${playlist.owner.display_name}</p>
        </div>
      </div>
    `)
  })
}

// TODO à faire au chargement de la page !
window.addEventListener("load", () => {
  // populateUI(profile);
  placeUserTopSongs(userTopSongs);
  placeRecentSongs(recentSongs);
  placeNewReleases(newReleases);
  placePlaylists(userPlaylists);
  placePopularPlaylist(popularPlaylists);
});
