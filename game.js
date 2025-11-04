const c = document.getElementById("game");
const ctx = c.getContext("2d");

let player = { x: 280, y: 370, w: 40, h: 20 };
let bullets = [];
let enemies = [];
let keys = {};
let score = 0;

for (let i = 0; i < 5; i++) enemies.push({ x: i * 100 + 40, y: 40, w: 30, h: 20, dir: 1 });

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function shoot() {
  bullets.push({ x: player.x + 18, y: player.y, w: 4, h: 10 });
}
setInterval(() => { if (keys["Space"]) shoot(); }, 300);

function update() {
  if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
  if (keys["ArrowRight"] && player.x + player.w < c.width) player.x += 5;

  bullets.forEach(b => b.y -= 6);
  bullets = bullets.filter(b => b.y > 0);

  enemies.forEach(e => {
    e.x += 2 * e.dir;
    if (e.x < 0 || e.x + e.w > c.width) e.dir *= -1;
  });

  enemies.forEach((e, ei) => {
    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + e.w && b.x + b.w > e.x &&
        b.y < e.y + e.h && b.y + b.h > e.y
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });
  });

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = "white";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
  ctx.fillStyle = "red";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));
  ctx.fillStyle = "yellow";
  ctx.font = "16px monospace";
  ctx.fillText("Score: " + score, 10, 20);
}

update();