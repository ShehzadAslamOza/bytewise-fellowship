// Buttons
const startStopBtn = document.querySelector("#startStopBtn");
const resetBtn = document.querySelector("#resetBtn");

// Time
let seconds = 0;
let minutes = 0;
let hours = 0;

// leading values
let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

// set interval and timerstatus
let timerInterval = null;
let timerStatus = "stopped";

// Stopwatch function

function Stopwatch() {
  seconds++;

  if (seconds / 60 == 1) {
    seconds = 0;
    minutes++;
  }

  if (minutes / 60 == 1) {
    minutes = 0;
    hours++;
  }

  if (seconds < 10) {
    leadingSeconds = "0" + seconds.toString();
  } else {
    leadingSeconds = seconds;
  }
  if (minutes < 10) {
    leadingMinutes = "0" + minutes.toString();
  } else {
    leadingMinutes = minutes;
  }
  if (hours < 10) {
    leadingHours = "0" + hours.toString();
  } else {
    leadingHours = hours;
  }

  let displayTimer = (document.getElementById("timer").innerText =
    leadingHours + ":" + leadingMinutes + ":" + leadingSeconds);
}

// buttons event listeners
startStopBtn.addEventListener("click", () => {
  if (timerStatus == "stopped") {
    timerInterval = window.setInterval(Stopwatch, 1000);
    startStopBtn.innerHTML = `<i class="fa-solid fa-pause" id="pause"></i>`;
    timerStatus = "started";
  } else {
    window.clearInterval(timerInterval);
    startStopBtn.innerHTML = `<i class="fa-solid fa-play" id="play"></i>`;
    timerStatus = "stopped";
  }
});

// reset Btn
resetBtn.addEventListener("click", () => {
  seconds = 0;
  minutes = 0;
  hours = 0;

  document.getElementById("timer").innerHTML = "00:00:00";
  window.clearInterval(timerInterval);
  timerInterval = window.setInterval(Stopwatch, 1000);
});
