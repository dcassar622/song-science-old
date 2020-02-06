export class AudioPlayer {
  setupPlayer(trackId) {
    let playerArea = document.getElementById("player-area");

    let url = "https://open.spotify.com/embed/track/" + trackId;

    playerArea.innerHTML = `<iframe src=${url} width="300" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> `;
  }
}
