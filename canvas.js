var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
const maxSize = 100;

console.log(canvas);

var mouse = {
  x: undefined,
  y: undefined
}

var circleArray = [];

for (let i = 0; i < 100; i++) {
  // arc
  let radius = Math.ceil(Math.random() * 10) * 4;
  let x = Math.floor(Math.random() * (innerWidth - radius * 2)) + radius;
  let y = Math.floor(Math.random() * (innerHeight - radius * 2)) + radius;
  let dx = Math.ceil(Math.random() * 3) * ((Math.round(Math.random()) * 2) - 1);
  let dy = Math.ceil(Math.random() * 3) * ((Math.round(Math.random()) * 2) - 1);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.originalRadius = radius;
  this.r = Math.floor(Math.random() * 256);
  this.g = Math.floor(Math.random() * 256);
  this.b = Math.floor(Math.random() * 256);
  this.a = .5;
  this.color = this.r + ',' + this.g + ',' + this.b;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = 'rgb(' + this.color + ')';
    c.stroke();
    c.fillStyle = 'rgba(' + this.color + ', 0.5)';
    c.fill();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = (this.dx * -1);

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = (this.dy * -1);

    this.x += this.dx;
    this.y += this.dy;

    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      if (this.radius < maxSize)
        this.radius++;
    } else if (this.radius > this.originalRadius)
      this.radius--;

    this.draw();
  }
}


function animate() {
  requestAnimationFrame(animate); // how does this work?
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('ontouchmove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});