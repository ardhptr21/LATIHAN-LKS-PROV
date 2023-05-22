const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

const speed = 5;
const rad = 10;

let x = 10;

let move = speed;

const DrawMe = () => {
  ctx.clearRect(0, 0, 400, 320);
  if (x > canvas.width - rad || x < rad) move = -move;

  x += move;

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(x, canvas.height / 2, rad, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
};

setInterval(DrawMe, 10);