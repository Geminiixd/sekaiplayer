let playerarea = document.querySelector(".myplayer");
let media = playerarea.querySelector("video");
let controls = playerarea.querySelector(".player-controls");
let play = controls.querySelector(".play");
let rewind = controls.querySelector(".rewind");
let forward = controls.querySelector(".forward");
let volume = controls.querySelector(".volume");
let fullscreen = controls.querySelector(".fullscreen");
let timer = controls.querySelector(".timer");
let current = timer.querySelector(".currenttime");
let vidtime = timer.querySelector(".videotime");
let progressbar = controls.querySelector(".current-progressbar");
let volicon = controls.querySelector(".volume .icon");
let volvalue = controls.querySelector(".volumebardiv");
let volbar = controls.querySelector(".volumebar");
let fsrc = fullscreen.querySelector("i");
let link = document.querySelector(".link");
let start = document.querySelector(".start");
let alert = document.querySelector(".alert")
let mode = document.querySelector(".mode")
let modeicon = document.querySelector(".mode .ion-ios-moon")

mode.addEventListener("click", function() {
  document.body.classList.toggle("dark")
  start.classList.toggle("light")
  start.classList.toggle("start")
  modeicon.classList.toggle("ion-ios-sunny")
  modeicon.classList.toggle("ion-ios-moon")
 modeicon.classList.toggle("light")
})


media.style.width = '600px'

start.addEventListener("click", function () {

  if(link.value === '' || !link.value.startsWith("https://")) {
    alert.classList.add("active")
    alert.textContent = "Please enter a valid video link"
    
   
    setTimeout(() => {
      alert.classList.remove("active")
    }, 2000);

    return
  }

  else {
    alert.classList.remove("active")
    media.src = link.value;
  }
});

console.log(volvalue);
//  right player btns event listeners
play.addEventListener("click", function (e) {
  vidtime.textContent = gettime(media.duration);
  if (media.paused) {
    media.play();
    toggleplay();
  } else {
    toggleplay();
    media.pause();
  }
});

rewind.addEventListener("click", function () {
  media.currentTime = media.currentTime - 5;
});

forward.addEventListener("click", function () {
  media.currentTime = media.currentTime + 5;
});

function toggleplay() {
  let icon = play.querySelector("i");
  icon.classList.toggle("ion-md-pause");
  icon.classList.toggle("ion-md-play");
}

// vid time management

media.addEventListener("timeupdate", function () {
  current.textContent = gettime(media.currentTime);
  let barlength = (media.currentTime / media.duration) * 100;
  if (media.ended === true) {
    let icon = play.querySelector("i");
    toggleplay();
  }
  progressbar.style = `background: linear-gradient(90deg, rgba(230,126,34,1) ${barlength}%, #e1e1e1 0%);`;
});

function gettime(time) {
  let mins = Math.floor(time / 60);
  let secs = Math.floor(time - mins * 60);

  let minutesvalue;
  let secvalue;

  if (mins < 10) {
    minutesvalue = "0" + mins;
  } else {
    minutesvalue = mins;
  }

  if (secs < 10) {
    secvalue = "0" + secs;
  } else {
    secvalue = secs;
  }

  return minutesvalue + ":" + secvalue;
}

progressbar.addEventListener("input", function () {
  media.currentTime = (this.value / 100) * media.duration;
});

//volume

volicon.addEventListener("click", function () {
  volvalue.classList.toggle("active");
});

volbar.addEventListener("input", function () {
  media.volume = this.value / 100;
  this.style = `background: linear-gradient(90deg, rgba(230,124,34,1) ${this.value}%, #e1e1e1 0%);`;
  if (media.volume === 0) {
    media.muted = true;
    volicon.classList.replace("ion-md-volume-high", "ion-md-volume-off");
  } else {
    media.muted = false;
    volicon.classList.replace("ion-md-volume-off", "ion-md-volume-high");
  }
});

// full screen

fullscreen.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    if (playerarea.requestFullscreen) {
      playerarea.requestFullscreen();
      fsrc.classList.replace("ion-md-expand", "ion-md-exit");
      media.style.width = '100%'
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fsrc.classList.replace("ion-md-exit", "ion-md-expand");
      media.style.width = '600px'
    }
  }
});
