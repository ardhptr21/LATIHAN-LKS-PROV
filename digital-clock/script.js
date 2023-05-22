const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const timer = document.getElementById('timer');

let timerInterval;
let centiseconds = 0;
let seconds = 0;

const padNumber = (num) => num < 10 ? `0${num}` : num;
const padNumber2 = (num) => num < 10 ? `00${num}` : num < 100 ? `0${num}` : num;

function updateTimer() {
  centiseconds++;
  if (centiseconds == 100) {
    centiseconds = 0;
    seconds++;
  }
  if (seconds == 999 && centiseconds == 99) {

    clearInterval(timerInterval);
  }
  timer.textContent = `${padNumber2(seconds)}:${padNumber(centiseconds)}`;
}


start.onclick = () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 10);
  }
};

stop.onclick = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

reset.onclick = () => {
  centiseconds = 0;
  seconds = 0;
  timer.textContent = '000:00';
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};