const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.querySelectorAll("#playlist li");

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(index){

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].src;

    playlist.forEach(item => item.classList.remove("active"));
    playlist[index].classList.add("active");

}

loadSong(songIndex);

// Play Song
function playSong(){

    audio.play();
    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

}

// Pause Song
function pauseSong(){

    audio.pause();
    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}

// Play Button
playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }

});

// Next Song
function nextSong(){

    songIndex++;

    if(songIndex >= songs.length){
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

}

// Previous Song
function prevSong(){

    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

}

nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);

// Progress Bar
audio.addEventListener("timeupdate",()=>{

    const progressPercent =
    (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    currentTime.textContent =
    formatTime(audio.currentTime);

    duration.textContent =
    formatTime(audio.duration);

});

// Seek Song
progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) * audio.duration;

});

// Volume
volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

// Time Format
function formatTime(time){

    if(isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

}

// Autoplay Next Song
audio.addEventListener("ended",nextSong);

// Playlist
playlist.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        songIndex = index;

        loadSong(songIndex);

        playSong();

    });

});

// Keyboard Support
document.addEventListener("keydown",(e)=>{

    if(e.code === "Space"){

        e.preventDefault();

        if(isPlaying){
            pauseSong();
        }else{
            playSong();
        }

    }

    if(e.key === "ArrowRight"){
        nextSong();
    }

    if(e.key === "ArrowLeft"){
        prevSong();
    }

});