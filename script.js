// Selecting elements
const video = document.getElementById("myVideo");
const playBtn = document.getElementById("playPause");
const stopBtn = document.getElementById("stop");
const volumeBar = document.getElementById("volumeBar");
const timeDisplay = document.getElementById("timeDisplay");

// Play or Pause functionality
playBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playBtn.textContent = "Pause";
    } else {
        video.pause();
        playBtn.textContent = "Play";
    }
});

// Stop functionality
stopBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    playBtn.textContent = "Play";
});

// Volume control
volumeBar.addEventListener("input", (e) => {
    video.volume = e.target.value;
});

// Update time display
video.addEventListener("timeupdate", () => {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);
    timeDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});