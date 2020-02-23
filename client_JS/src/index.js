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

/* ---------- main logic (hardwired id for development) ---------- 

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

/* ---------- main logic ---------- */
const formArea = document.getElementById("form-wrapper");
const searchForm = document.getElementById("search-form");
const trackDataArea = document.getElementById("track-data");
const infoPlayerArea = document.getElementById("info-player-area");

// get track data and display it
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  trackDataArea.className = "wrapper";
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
}
