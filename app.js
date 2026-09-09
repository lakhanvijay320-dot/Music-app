const audio = document.getElementById("audio");
const songList = document.getElementById("songList");
const currentSong = document.getElementById("currentSong");
const progress = document.getElementById("progress");
const fileInput = document.getElementById("fileInput");
const search = document.getElementById("search");

let songs = [];
let currentIndex = -1;

fileInput.addEventListener("change", function () {
  const files = Array.from(this.files);

  files.forEach(file => {
    songs.push({
      name: file.name,
      url: URL.createObjectURL(file)
    });
  });

  showSongs();
});

function showSongs(filter = "") {
  songList.innerHTML = "";

  songs
    .filter(song =>
      song.name.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((song, index) => {
      const div = document.createElement("div");
      div.className = "song";

      div.innerHTML = `
        <span>🎵 ${song.name}</span>
        <button onclick="playSong(${index})">▶</button>
      `;

      songList.appendChild(div);
    });
}

function playSong(index) {
  if (!songs[index]) return;

  currentIndex = index;
  audio.src = songs[index].url;
  currentSong.textContent = songs[index].name;

  audio.play();
}

function togglePlay() {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  if (songs.length === 0) return;

  currentIndex++;

  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }

  playSong(currentIndex);
}

function previousSong() {
  if (songs.length === 0) return;

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = songs.length - 1;
  }

  playSong(currentIndex);
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value =
      (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime =
      (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", nextSong);

search.addEventListener("input", () => {
  showSongs(search.value);
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
