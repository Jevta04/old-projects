let secondsElapsed = 0;
let interval;
const time = document.getElementById("time");


// interesantna funkcija za resavanje '00:00'
function padStart(value){
    return String(value).padStart(2, "0");
}
function setTime(){
    let minutes = Math.floor(secondsElapsed / 60);
    let seconds = secondsElapsed % 60;
    time.textContent = `${padStart(minutes)}:${padStart(seconds)}`;
}

function timer(){
    secondsElapsed++;
    setTime();
}

function start() {
    if (interval) return;
    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    secondsElapsed = 0;
    setTime();
}