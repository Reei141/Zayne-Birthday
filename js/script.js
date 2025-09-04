// Elements
const audio = document.getElementById("player");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressFill = document.querySelector(".fill");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const titleEl = document.getElementById("title"); 
const artistEl = document.getElementById("artist"); // optional
const coverEl = document.getElementById("cover");   // <img id="cover">

// List of songs
const songs = [
  {
    title: "About You",
    artist: "The 1975",
    src: "music/aboutYou.mp3",
    cover: "music/cat-paw.jpeg"
  },
  {
    title: "Heavy",
    artist: "Linkin Park",
    src: "music/heavy.mp3",
    cover: "music/hand2.jpeg"
  },
  {
    title: "Multo",
    artist: "Cup Of Joe",
    src: "music/hindi.mp3",
    cover: "music/kiss.jpeg"
  }
];

let songIndex = 0;

// Load a song
function loadSong(index) {
  const song = songs[index];
  console.log(`Loading song: ${song.title}`);
  console.log(`Cover image: ${song.cover}`);
  audio.src = song.src;
  titleEl.textContent = song.title;
  if (artistEl) artistEl.textContent = song.artist;
  if (coverEl) {
    coverEl.src = song.cover;
    console.log(`Image src: ${coverEl.src}`);
  }
  audio.load();
}

// Format time helper
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Update duration once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Update progress bar + current time
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressFill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

// Play/Pause button
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

// Next Song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸";
});

// Previous Song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸";
});

// Auto play next when current song ends
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Initialize first song
loadSong(songIndex);