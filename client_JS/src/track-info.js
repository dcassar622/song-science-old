export class TrackInfoComponent {
  constructor(spotify, trackId) {
    this.spotify = spotify;
    this.trackId = trackId;
  }

  async getTrackInfo() {
    let trackMeta = await this.spotify.getTrack(this.trackId);
    let trackInfo = await this.spotify.getAudioFeaturesForTrack(this.trackId);

    let name = trackMeta.name;
    if (name.includes("-")) {
      name = name.split("-")[0];
    } else if (name.includes("(")) {
      name = trackMeta.name.replace(/ *\([^)]*\) */g, "");
    }

    let artist = getArtist(trackMeta.artists);
    let album = getAlbum(trackMeta.album).replace(/ *\([^)]*\) */g, "");

    let tempo = getTempo(trackInfo.tempo);
    let key = getKey(trackInfo.key);
    let mode = getMode(trackInfo.mode);
    let minutes = getDuration(trackInfo.duration_ms).minutes;
    let seconds = getDuration(trackInfo.duration_ms).seconds;

    let displayArea = document.getElementById("track-info-wrapper");
    displayArea.innerHTML = `
    <div id='info-column'>
    <h2>Track Metadata</h2>
      <div id='info-area'>
        <div>
          <p><span class='key'> Track name </span></p>
          <p><span class='key'> Artist </span></p>
          <p><span class='key'> Album </span></p>
          <p><span class='key'> Song Length </span></p> 
          <p><span class='key'> Tempo </span></p>
          <p><span class='key'> Key </span></p>
        </div>
        <div>
        <p>${name} </p>
          <p>${artist} </p>
          <p>${album} </p>
          <p>${minutes} minutes ${seconds} seconds </p> 
          <p>${tempo} bpm </p>
          <p>${key}&nbsp;${mode}</p>
        </div>
      </div>
      </div>
    `;
  }
}

// gets the right artist from returned array of artists (typically the first item)
function getArtist(artists) {
  let artist = artists[0].name;
  return artist;
}

// gets the album name from returned album object
function getAlbum(albumObject) {
  let album = albumObject.name;
  return album;
}

//get artwork
function getArtwork(albumObject) {
  let artworkUrl = albumObject.album.images[0].url;
  let artwork = artworkUrl.replace(/^https?\:\/\//i, "");
  return artwork;
}

// rounds the tempo value from the api to the nearest whole number
function getTempo(tempoFloat) {
  let tempo = Math.round(tempoFloat);
  return tempo;
}

/* takes in the numerical key value from the API and 
    converts it into the relevant key name */
function getKey(keyNum) {
  let keysArray = [
    `C`,
    `C#`,
    `D`,
    `Eb`,
    `E`,
    `F`,
    `F#`,
    `G`,
    `Ab`,
    `A`,
    `Bb`,
    `B`
  ];

  let key = keysArray[keyNum];
  return key;
}

function getMode(modeNum) {
  let mode;
  if (modeNum === 0) {
    mode = "minor";
  } else if (modeNum === 1) {
    mode = "major";
  }

  return mode;
}

function getDuration(milliseconds) {
  let duration = {
    minutes: Math.floor(milliseconds / 60000),
    seconds: ((milliseconds % 60000) / 1000).toFixed(0)
  };

  return duration;
}
