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
let alert = document.querySelector(".alert");
let mode = document.querySelector(".mode");
let modeicon = document.querySelector(".mode .ion-ios-moon");
let focusmodebtn = document.querySelector(".faq");
let extraelements = [start, mode, modeicon, link];

let switchmodes =  function() {
  document.body.classList.toggle("dark-mode");
start.classList.toggle("dark-mode");
modeicon.classList.toggle("ion-ios-sunny");
modeicon.classList.toggle("ion-ios-moon");
modeicon.classList.toggle("light");
}

mode.addEventListener("click", switchmodes);



media.style.width = "600px";

start.addEventListener("click", videostart);

function videostart() {
  if (link.value === "" || !link.value.startsWith("https://")) {
    swal("Wrong link", "You entered a wrong link!", "error");

    setTimeout(() => {
      alert.classList.remove("active");
    }, 2000);

    return;
  } else {
    alert.classList.remove("active");
    Toastify({
      text: "Video Loaded Succesfully!",

      duration: 3000,
      style: {
        background: "var(--background)",
        boxshadow: "0 0 4px var(--primary), 0 0 48px var(--accent)",
        color: "var(--text)",
        borderRadius: "10px",
      },
    }).showToast();
    media.src = link.value;
  }
}

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
  media.currentTime = media.currentTime - 15;
});

forward.addEventListener("click", function () {
  media.currentTime = media.currentTime + 15;
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
  progressbar.style = ` background: linear-gradient(90deg, rgb(12, 35, 77) ${barlength}%, #e1e1e1 0%);`;
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

volbar.style = `background: linear-gradient(90deg, rgb(12, 35, 77) ${this.value}%, #e1e1e1 0%);`;
volbar.addEventListener("input", function () {
  media.volume = this.value / 100;
  this.style = `background: linear-gradient(90deg, rgb(12, 35, 77) ${this.value}%, #e1e1e1 0%);`;
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
      media.style.width = "100%";
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fsrc.classList.replace("ion-md-exit", "ion-md-expand");
      media.style.width = "600px";
    }
  }
});

// errors

//focus mode
// Assuming you have a variable to track the focus mode state
let focusModeEnabled = false;

// Your button click event listener
focusmodebtn.addEventListener("click", toggleFocusMode);

function toggleFocusMode() {
  swal({
    title: `${focusModeEnabled ? "Disable" : "Enable"} Focus Mode?`,
    text: "Once enabled, all elements except the video player will be hidden from your screen",
    icon: "warning",
    buttons: true,
    dangermode: true,
  }).then((enable) => {
    if (enable) {
      // Update the state
      focusModeEnabled = !focusModeEnabled;

      swal({
        title: `${focusModeEnabled ? "Enabled!" : "Disabled!"}`,
        icon: focusModeEnabled ? "success" : "info",
        buttons: true,
      });

      // Toggle the 'hidden' class on your elements
      extraelements.forEach((el) =>
        el.classList.toggle("hidden", focusModeEnabled)
      );
    } else {
      swal({
        title: "Action Canceled",
        icon: "info",
        buttons: true,
      });
    }
  });
}

// set theme
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // User prefers dark mode
  // Set your website theme accordingly
  document.body.classList.add("dark-mode");
  modeicon.classList.toggle("ion-ios-moon");
  modeicon.classList.toggle("ion-ios-sunny");
  start.classList.toggle("dark-mode");
} else {
  // User prefers light mode or the preference is not defined
  // Set your website theme accordingly
  document.body.classList.add("light");
  modeicon.classList.toggle("ion-ios-sunny");
  modeicon.classList.toggle("ion-ios-moon");
  start.classList.toggle("dark-mode");
}


// shortcuts 

let videoplayshortcut = document.body.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
 videostart()
  }
  else {

  }
})

document.body.addEventListener('keydown', function(event) {
  if (event.key === 'Shift' && '/') {
toggleFocusMode()
  }
  else {
      
  }
})

document.body.addEventListener('keydown', function(event) {
  if (event.key === 'm') {
    switchmodes()
  }
  else {
      
  }
})
