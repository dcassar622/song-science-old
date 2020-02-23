import Chart from "chart.js";

export class ChartsComponent {
  constructor(spotify, trackId) {
    this.spotify = spotify;
    this.trackId = trackId;
  }

  async setupCharts() {
    /* ---------- RMS (loudness) CHART ---------- */
    let trackAnalysis = await this.spotify.getAudioAnalysisForTrack(
      this.trackId
    );

    let sections = trackAnalysis.sections;

    // defines values for loudness (y-axis)
    let sectionsLoudness = [];
    sections.map(function(section, index) {
      sectionsLoudness[index] = section.loudness;
    });

    // defines values for timecode in song (x-axis)
    let sectionsStart = [];
    sections.map(function(section, index) {
      let mins = Math.floor(section.start / 60);
      let secs = Math.round(section.start % 60);
      if (secs < 10) {
        sectionsStart[index] = mins + " : 0" + secs;
      } else {
        sectionsStart[index] = mins + " : " + secs;
      }
    });

    let rmsChartHeader = document.getElementById("rms-chart-header");
    rmsChartHeader.innerHTML = `
   
      <div class='chart-header'> 
        <p class='chart-title'> Song Dynamics </p>
        <p>This chart shows the <b>dynamic range</b> of a song, based on the varying RMS loudness throughout the track's progression <p>
        <p><br><span> (0 is the largest possible value) <span><br></p>
      </div>
    
    `;
    let ctx = document.getElementById("rms-chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: sectionsStart,
        datasets: [
          {
            label: "Loudness (RMS)",
            data: sectionsLoudness,
            /*backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],*/
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["#1db954"],
            pointBackgroundColor: "#C0C0C0",
            borderWidth: 4,
            fill: false
          }
        ]
      },
      options: {
        hover: {
          mode: "nearest",
          intersect: true
        },
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 18
          }
        },
        elements: {
          point: {
            radius: 3
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
                color: "#C0C0C0"
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time (in seconds)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                drawOnChartArea: true,
                color: "#C0C0C0"
              },
              ticks: {
                beginAtZero: false
                //reverse: true
              }
            }
          ]
        }
      }
    });

    /* ---------- FEATURES (pie) CHART ---------- */
    let trackFeatures = await this.spotify.getAudioFeaturesForTrack(
      this.trackId
    );

    let energy = trackFeatures.energy;
    let danceability = trackFeatures.danceability;
    let valence = trackFeatures.valence;

    let featuresArray = [energy, danceability, valence];
    console.log(featuresArray);

    let featuresChartHeader = document.getElementById("features-chart-header");
    featuresChartHeader.innerHTML = `
      <p class='chart-header'> 
      <span class='chart-title'> Song Features </span> <br><br>
      - this chart shows the track's energy, danceability (rhythmic strength) and valence (how upbeat and 'happy' it sounds)... <br><br>
      *** <span class="chart-info-footnote"> the total possible value range is [0-1], with 0 being the lowest score for a particular feature and 1 the highest </span>
      <p> 
    `;

    let ctx2 = document.getElementById("features-chart").getContext("2d");
    new Chart(ctx2, {
      type: "polarArea",
      data: {
        datasets: [
          {
            data: featuresArray,
            backgroundColor: [
              "rgba(0,0,0,0.75)",
              "rgba(0,255,0, 0.5)",
              "rgba(255,255,255,0.75)"
            ],
            borderWidth: 0
          }
        ],
        labels: ["energy", "danceability", "valence"]
      },
      options: {
        hover: {
          mode: "nearest",
          intersect: true
        },
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 18
          }
        },
        gridLines: {
          display: false
        },
        scale: { gridLines: { color: "black" } },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawOnChartArea: true,
                color: "#C0C0C0"
              }
            }
          ]
        }
      }
    });
  }
}
