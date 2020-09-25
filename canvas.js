var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

console.log(canvas);

// c.fillStyle = 'rgba(255,0,0,0.5)';
// c.fillRect(100, 50, 50, 50);
// c.fillStyle = 'rgba(0,255,0,0.5)';
// c.fillRect(75, 40, 50, 50);
// c.fillStyle = 'rgba(0,0,255,0.5)';
// c.fillRect(80, 60, 50, 50);


// // lines
// c.beginPath();  // start a path unrelated to any prior actions
// c.moveTo(50, 200);
// c.lineTo(250, 100);
// c.lineTo(300, 400);
// c.strokeStyle = '#A12DD6';
// c.stroke();


var circleArray = [];

for (let i = 0; i < 50; i++) {
  // arc
  let radius = Math.ceil(Math.random() * 10) * 4;
  let x = Math.floor(Math.random() * (innerWidth - radius * 2)) + radius;
  let y = Math.floor(Math.random() * (innerHeight - radius * 2)) + radius;
  let dx = Math.ceil(Math.random() * 5) * ((Math.round(Math.random()) * 2) - 1);
  let dy = Math.ceil(Math.random() * 5) * ((Math.round(Math.random()) * 2) - 1);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.r = Math.floor(Math.random() * 256);
  this.g = Math.floor(Math.random() * 256);
  this.b = Math.floor(Math.random() * 256);
  this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color;
    c.stroke();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = (this.dx * -1);

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = (this.dy * -1);

    this.x += this.dx;
    this.y += this.dy;

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