export class TrackSectionsComponent {
  constructor(spotify, trackId) {
    this.spotify = spotify;
    this.trackId = trackId;
  }

  async getSectionsData() {
    let trackInfo = await this.spotify.getAudioAnalysisForTrack(this.trackId);

    let sections = trackInfo.sections;
    console.log(sections);

    let loudnessAvg = getLoudnessAvg(sections);

    let sectionArea = document.getElementById("grid-sections-area");

    /* ---------- Grid Area ----------- */

    let gridSectionsHeader = document.getElementById("grid-sections-header");
    console.log(gridSectionsHeader);
    // sset the header/title for the sections/grid area of the app
    gridSectionsHeader.innerHTML = `
      <p class='chart-header'> 
      <span class='chart-title'> Track Sections </span> <br><br>
      - each square in the grid corresponds to a particular section in the song, which is somewhat dynamically different from the previous as well as the next section (ex "verse, chorus, etc...) <br><br>
      *** <span class="chart-info-footnote"> The brighter the square, the louder and more dynamically involved the section is </span> ***
      <p> 
    `;

    sectionArea.innerHTML = "";

    /* *** sections *** */
    sections.forEach(section => {
      let newSection = document.createElement("div");
      let sectionTimecode = document.createElement("p");

      let minutesStart = Math.floor(section.start / 60);
      let secondsStart = Math.round(section.start % 60);

      let minutesEnd = Math.floor((section.start + section.duration) / 60);
      let secondsEnd = Math.round((section.start + section.duration) % 60);

      if (secondsStart < 10) {
        sectionTimecode.innerHTML = `${minutesStart}:0${secondsStart}<br> - <br>${minutesEnd}:${secondsEnd}`;
      } else if (secondsEnd < 10) {
        sectionTimecode.innerHTML = `${minutesStart}:${secondsStart}<br> - <br>${minutesEnd}:0${secondsEnd}`;
      } else if (secondsStart >= 10 && secondsEnd >= 10) {
        sectionTimecode.innerHTML = `${minutesStart}:${secondsStart}<br> - <br>${minutesEnd}:${secondsEnd}`;
      }

      // calculate the difference between the loudness of each section and the overall average loudness of the track
      let avgLoudnessDelta = Math.abs(section.loudness - loudnessAvg);
      if (avgLoudnessDelta > 5) {
        avgLoudnessDelta = 5;
      }

      newSection.className = "section";
      // give each section a differently shaded background color depending on the loudness of that particular section
      newSection.style.backgroundColor = `rgb(${avgLoudnessDelta * 5},${255 -
        avgLoudnessDelta * 45},${avgLoudnessDelta * 10})`;

      sectionTimecode.className = "timecode";

      // adds new section and its timecode to the grid
      newSection.appendChild(sectionTimecode);
      sectionArea.appendChild(newSection);
    });
  }
}

// calculates the average loudness across all the sections in the track
function getLoudnessAvg(array) {
  let total = 0;

  array.forEach(section => {
    total += section.loudness;
  });

  let avg = total / array.length;
  return avg;
}
