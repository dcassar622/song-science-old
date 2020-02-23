export class AudioPlayer {
  setupPlayer(trackId) {
    let playerArea = document.getElementById("player-area");

    // get requested song from spotify
    let url = "https://open.spotify.com/embed/track/" + trackId;

    // display embedded spotify player
    playerArea.innerHTML = `<iframe src=${url} width="300" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> `;
  }
}
