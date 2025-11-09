const typedPhrases = ["DevOps Engineer", "Cloud Enthusiast", "CI/CD Automation", "Infrastructure as Code"];
let pIndex = 0;
let cIndex = 0;
let deleting = false;
const typedEl = document.getElementById("typed");
const speed = 90;

function tick() {
  const current = typedPhrases[pIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, cIndex + 1);
    cIndex++;
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, cIndex - 1);
    cIndex--;
    if (cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % typedPhrases.length;
    }
  }
  setTimeout(tick, deleting ? speed / 2 : speed);
}
document.addEventListener("DOMContentLoaded", tick);

const canvas = document.createElement("canvas");
const prt = document.getElementById("particles");
prt.appendChild(canvas);
const ctx = canvas.getContext("2d");
let w, h, particles;
function resize() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  w = canvas.width = Math.floor(window.innerWidth * dpr);
  h = canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(dpr, dpr);
}
function initParticles() {
  particles = [];
  const count = Math.round((window.innerWidth * window.innerHeight) / 90000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.6 + 0.2
    });
  }
}
function step() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -10) p.x = window.innerWidth + 10;
    if (p.x > window.innerWidth + 10) p.x = -10;
    if (p.y < -10) p.y = window.innerHeight + 10;
    if (p.y > window.innerHeight + 10) p.y = -10;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,224,255,' + p.o + ')';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(step);
}
function start() {
  resize();
  initParticles();
  step();
}
window.addEventListener("resize", function(){
  resize();
  initParticles();
});
start();
