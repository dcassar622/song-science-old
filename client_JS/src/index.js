import { TrackIDManager } from "./track-id-manager.js";
import { TrackInfoComponent } from "./track-info.js";
import { AudioPlayer } from "./audio-player.js";
import { ChartsComponent } from "./charts-component.js";
import { TrackSectionsComponent } from "./track-sections.js";

var Spotify = require("spotify-web-api-js");
var spotify = new Spotify();

const params = getHashParams();
let access_token = params.access_token,
  refresh_token = params.refresh_token,
  error = params.error;

spotify.setAccessToken(params.access_token);

export function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

/* ---------- PLAYER WIDGET ---------- */

/* ---------- main logic (hardwired id for development) ---------- */

let trackId = "67vYdAAM3oGsEImCRfbtsF";

let infoPlayerArea = document.getElementById("info-player-area");
infoPlayerArea.className = "";

//setups up audio player
let audioPlayer = new AudioPlayer();
audioPlayer.setupPlayer(trackId);

//sets up and displays general track info
let trackInfoComponent = new TrackInfoComponent(spotify, trackId);
trackInfoComponent.getTrackInfo();

//sets up and displays charts
let chartsComponent = new ChartsComponent(spotify, trackId);
chartsComponent.setupCharts();

// sets up and displays track audio analysis
let trackSectionsComponent = new TrackSectionsComponent(spotify, trackId);
trackSectionsComponent.getSectionsData();

/* ---------- main logic ---------- 
let overlay = document.getElementById("overlay");
let openSearchForm = document.getElementById("sidebar-search");
let formArea = document.getElementById("form-wrapper");
let submitIdBtn = document.getElementById("submit-btn");
let closeFormBtn = document.getElementById("close-form-btn");
let infoPlayerArea = document.getElementById("info-player-area");

let formOpen = false;

// if user presses search icon while form is closed
openSearchForm.addEventListener("click", () => {
  if (formOpen === false) {
    overlay.className = "";
    formArea.className = "show-form";
    formOpen = true;
  }
  // if user presses search icon while form is open
  else if (formOpen === true) {
    overlay.className = "hidden";
    formArea.className = "hide-form";
    formOpen = false;
  }
});

// if user presses 'close-form' button
closeFormBtn.addEventListener("click", () => {
  overlay.className = "hidden";
  formArea.className = "hide-form";
  formOpen = false;
});

// if user clicks anywhere on the window except the form area while the form is open
overlay.addEventListener("click", e => {
  if (formOpen === true && e.target !== "form-wrapper") {
    console.log("In The Window");
    overlay.className = "hidden";
    formArea.className = "hide-form";
    formOpen = false;
  }
});

// get track data and display it
submitIdBtn.addEventListener("click", () => {
  let trackIDManager = new TrackIDManager();
  let data = trackIDManager.getTrackId(spotify);
  data.then(function(trackId) {
    setupData(trackId);
  });
});

function setupData(trackId) {
  infoPlayerArea.className = "";

  //setups up audio player
  let audioPlayer = new AudioPlayer();
  audioPlayer.setupPlayer(trackId);

  // sets up and displays track info
  let trackInfoComponent = new TrackInfoComponent(spotify, trackId);
  trackInfoComponent.getTrackInfo();

  // sets up and displays track sections
  let trackDataComponent = new TrackSectionsComponent(spotify, trackId);
  trackDataComponent.getSectionsData();

  //sets up and displays charts
  let chartsComponent = new ChartsComponent(spotify, trackId);
  chartsComponent.setupCharts();
} */
