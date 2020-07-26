const canvas = document.getElementById('main__canvas');
const ctx = canvas.getContext('2d');

// offset header
const offsetHeader = 60;

const balls = [];

const minRadius = 10;
const maxRadius = 18;

const maxBalls = 12;

class Circle {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    this.dx = (Math.random() * 4) + 1;
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.dy = (Math.random() * 4) + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }

  animate() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > canvas.height - offsetHeader || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  }
}

const randomColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  let alpha = Math.random();

  if (alpha < 0.5) alpha = 0.25;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const initBalls = () => {
  for (let i = 0; i < maxBalls; i++) {
    let r = Math.floor(Math.random() * maxRadius) + minRadius;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let c = randomColor();
    balls.push(new Circle(x, y, r, c));
  }
};

const update = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].animate();
  }
  requestAnimationFrame(update);
};

initBalls();
update();

// Listener
canvas.addEventListener('click', e => {
  let r = Math.floor(Math.random() * maxRadius) + minRadius;
  balls.push(new Circle(e.clientX, e.clientY - offsetHeader, r, randomColor()));

  if (balls.length > maxBalls) {
    balls.shift();
  }
});

window.addEventListener('orientationchange', e => {
  location.reload();
});