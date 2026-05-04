const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

let x = 100;

function update() {
  x += 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 100, 50, 50);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
