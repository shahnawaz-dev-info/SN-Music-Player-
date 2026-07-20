const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.querySelectorAll("#playlist li");


// Songs List

const songs = [

    {
        name: "Song 1",
        artist: "Artist 1",
        src: "songs/song1.mp3"
    },

    {
        name: "Song 2",
        artist: "Artist 2",
        src: "songs/song2.mp3"
    },

    {
        name: "Song 3",
        artist: "Artist 3",
        src: "songs/song3.mp3"
    }

];


let songIndex = 0;



// Load Song

function loadSong(index){

    const song = songs[index];

    title.innerText = song.name;

    artist.innerText = song.artist;

    audio.src = song.src;


    playlist.forEach(item=>{
        item.classList.remove("active");
    });

    playlist[index].classList.add("active");

}



// Play Song

function playSong(){

    audio.play();

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

}



// Pause Song

function pauseSong(){

    audio.pause();

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}



// Play Button

playBtn.addEventListener("click",()=>{

    if(audio.paused){

        playSong();

    }else{

        pauseSong();

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



nextBtn.addEventListener("click",nextSong);



// Previous Song

prevBtn.addEventListener("click",()=>{

    songIndex--;

    if(songIndex < 0){

        songIndex = songs.length - 1;

    }


    loadSong(songIndex);

    playSong();

});




// Update Progress

audio.addEventListener("timeupdate",()=>{


    let percent =
    (audio.currentTime / audio.duration) * 100;


    progress.value = percent || 0;


    let current =
    Math.floor(audio.currentTime);


    let total =
    Math.floor(audio.duration);


    currentTime.innerText =
    formatTime(current);


    duration.innerText =
    formatTime(total);



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




// Auto Next

audio.addEventListener("ended",()=>{

    nextSong();

});




// Playlist Click

playlist.forEach((item,index)=>{


    item.addEventListener("click",()=>{


        songIndex = index;


        loadSong(songIndex);

        playSong();


    });


});




// Time Format

function formatTime(seconds){

    if(isNaN(seconds)){

        return "0:00";

    }


    let min =
    Math.floor(seconds / 60);


    let sec =
    Math.floor(seconds % 60);


    if(sec < 10){

        sec = "0" + sec;

    }


    return `${min}:${sec}`;

}



// Start First Song

loadSong(songIndex);
