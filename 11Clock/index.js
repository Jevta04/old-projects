const timeElement = document.getElementById("timeElement");
const dateElement = document.getElementById("dateElement");
const timezoneElement = document.getElementById("timezoneElement");

function updateClock() {
    const currentTimezone = dayjs.tz.guess();
    const currentTime = dayjs().tz(currentTimezone).format("HH : mm : ss");
    const currentDate = dayjs().format("dddd, D MMMM, YYYY");


    timeElement.textContent = currentTime;
    dateElement.textContent = currentDate;
    timezoneElement.textContent = currentTimezone;
}

setInterval(updateClock, 1000);


