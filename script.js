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

let switchmodes = function () {
  document.body.classList.toggle("dark-mode");
  start.classList.toggle("dark-mode");
  modeicon.classList.toggle("ion-ios-sunny");
  modeicon.classList.toggle("ion-ios-moon");
  modeicon.classList.toggle("light");
};

mode.addEventListener("click", switchmodes);

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

function playvideo(e) {
  console.log("Play button clicked");
  vidtime.textContent = gettime(media.duration);

  if (media.paused) {
    media.play();
    console.log("Video playing");
    toggleplay();
  } else {
    toggleplay();
    media.pause();
    console.log("Video paused");
  }
}

//  right player btns event listeners
play.addEventListener("click", playvideo);

function rewindfunction() {
  media.currentTime = media.currentTime - 15;
  console.log(media.currentTime);
}

function forwardfunction() {
  media.currentTime = media.currentTime + 15;
  console.log(media.currentTime);
}

rewind.addEventListener("click", function () {
  rewindfunction();
});

forward.addEventListener("click", function () {
  forwardfunction();
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
function fullscreenfunction() {
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
    }
  }
}
fullscreen.addEventListener("click", fullscreenfunction);

// Hide player options

let timeout;

function hideplayeroptions() {
  document.querySelector(".player-controls").style.opacity = 0;
}

function showplayeroptions() {
  document.querySelector(".player-controls").style.opacity = 1;
}

function resettimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(hideplayeroptions, 3000);
}

playerarea.addEventListener("mousemove", () => {
  showplayeroptions();
  resettimeout();
});

playerarea.addEventListener("mouseout", () => {
  if (! media.paused) {
    hideplayeroptions();
  }

  else {
    showplayeroptions()
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

let videoplayshortcut = document.body.addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Enter") {
      videostart();
    } else {
    }
  }
);

document.body.addEventListener("keydown", function (event) {
  if (event.key === "Shift" && "/") {
    toggleFocusMode();
  } else {
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.key === "s") {
    switchmodes();
  } else {
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    playvideo();
    showplayeroptions();
    resettimeout();
  } else {
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    forwardfunction();
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    rewindfunction();
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    if (media.volume !== 0) {
      volbar.value = Math.max(0, volbar.value - 2); // Decrease volbar.value
      media.volume = volbar.value / 100; // Update media volume based on adjusted value
      console.log("Volume Down:", volbar.value);
      console.log("Media Volume:", media.volume);
    }
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    volbar.value = Math.min(100, volbar.value + 0.2); // Increase volbar.value
    media.volume = volbar.value / 100; // Update media volume based on adjusted value
    console.log("Volume Up:", volbar.value);
    console.log("Media Volume:", media.volume);
    media.muted = false;
  }

  if (media.volume === 0) {
    media.muted = true;
  }
});

document.body.addEventListener("keydown", function (event) {
  if (event.key === "m") {
    if (media.muted === true) {
      media.muted = false;
      console.log("unmuted");
    } else {
      media.muted = true;
      console.log("muted");
    }
  }
});

playerarea.addEventListener("dblclick", fullscreenfunction);
media.addEventListener("click", playvideo);

function getMinuteAndSecondFromPosition(position) {
  const percentage = position / 100;
  const totalSeconds = media.duration * percentage;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { minutes, seconds };
}

progressbar.addEventListener("mousemove", function (event) {
  const rect = this.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percentage = offsetX / rect.width;

  const { minutes, seconds } = getMinuteAndSecondFromPosition(percentage * 100);
  showTooltip(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
});

// Add a mouseout event listener to hide the tooltip when not hovering over the progress bar
progressbar.addEventListener("mouseout", function () {
  hideTooltip();
});

// Function to show the tooltip at a specific position
function showTooltip(content) {
  tooltip.textContent = content;
  tooltip.style.left = `${event.clientX}px`;
  tooltip.style.top = `${event.clientY - 30}px`;
  tooltip.setAttribute("data-show", true);
}

// Function to hide the tooltip
function hideTooltip() {
  tooltip.removeAttribute("data-show");
}
