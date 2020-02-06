export class TrackIDManager {
  async getTrackId(spotify) {
    let idField = document.getElementById("track-id");
    let nameField = document.getElementById("track-name");

    // checks for ID first, if not then gets id from name
    let trackId;

    if (idField.value !== "") {
      trackId = idField.value;
    } else if (nameField.value !== "") {
      await getIdFromName(spotify, nameField.value).then(function(result) {
        trackId = result.tracks.items[0].id;
      });
    }
    return trackId;
  }
}

async function getIdFromName(spotify, name) {
  try {
    let data = await spotify.searchTracks(name);
    return data;
  } catch (e) {
    console.log("Oops I did it again!!");
  }
}
