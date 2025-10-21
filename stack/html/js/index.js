// Check for authentication
if (!sessionStorage.getItem('auth') && !localStorage.getItem('auth')) {
  window.location.href = 'login.html';
}

// Stars Animation
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random();
    this.opacityChange = (Math.random() - 0.5) * 0.02;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.opacityChange;
    
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.opacityChange *= -1;
    }
    
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initStars() {
  stars = [];
  const starCount = Math.floor((canvas.width * canvas.height) / 8000);
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

resizeCanvas();
initStars();
animate();

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

// Hide loading screen after page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 1500);
});

// Links data
const LINKS = [
  { name: "Twitch Drop Miner #1", url: "https://twitchdrop.iqballfarhan.web.id/", desc: "EndlessKnight", icon: "🎮", tag: "Public", ping: "/" },
  { name: "Twitch Drop Miner #2", url: "https://twitchdrop2.iqballfarhan.web.id/", desc: "IqballFarhan", icon: "🎮", tag: "Public", ping: "/" },
  { name: "Twitch Drop Miner #3", url: "https://bekgor.iqballfarhan.web.id/", desc: "Bekgor.", icon: "🎮", tag: "Public", ping: "/" },
  { name: "Portainer (Domain)", url: "https://portainer.iqballfarhan.web.id/#!/auth", desc: "UI Portainer via domain & reverse proxy.", icon: "🗂️", tag: "Public", ping: "/favicon.ico" },
  { name: "Portainer (LAN)", url: "http://192.168.1.17:9000/#!/auth", desc: "UI manajemen Docker lokal. Akses hanya dari jaringan lokal.", icon: "🛠️", tag: "LAN", ping: "/favicon.ico" },
  { name: "Beszel", url: "https://beszel.iqballfarhan.web.id/", desc: "Beszel server: monitoring & kontrol container.", icon: "📈", tag: "Public", ping: "/" },
  { name: "Speedtest", url: "https://speedtest.iqballfarhan.web.id/", desc: "LibreSpeed mandiri untuk uji jaringan.", icon: "🚀", tag: "Public", ping: "/" },
  { name: "Web SSH Terminal", url: "https://ssh.iqballfarhan.web.id/", desc: "Akses terminal Ubuntu mini-server langsung dari browser melalui SSH Web UI.", icon: "💻", tag: "Remote", ping: "/" },
  { name: "Cloudflare Tunnel Dashboard", url: "https://one.dash.cloudflare.com/64c507993f50bbbaca60d7df59e7486e/networks/tunnels", desc: "Panel Cloudflare Zero Trust • manajemen Argo Tunnel.", icon: "☁️", tag: "Cloud", ping: "/" }
];

const container = document.getElementById('links');

LINKS.forEach(link => {
  const div = document.createElement('div');
  div.className = "glass rounded-2xl p-5 border border-white/10 hover:border-sky-500/50 transition cursor-pointer text-left flex flex-col justify-between card-animate";
  div.innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-2xl">${link.icon}</span>
        <span class="text-[10px] uppercase px-2 py-0.5 rounded-full bg-slate-800/60 border border-white/10 text-slate-300">${link.tag}</span>
      </div>
      <h2 class="text-base font-semibold mb-1">${link.name}</h2>
      <p class="text-xs text-slate-400 mb-3">${link.desc}</p>
    </div>
    <div class="flex items-center justify-between">
      <a href="${link.url}" target="_blank" class="text-sky-400 hover:text-sky-300 text-sm font-medium">Buka →</a>
      <span id="ping-${link.name.replace(/\W/g,'')}" class="ping-dot bg-gray-500"></span>
    </div>
  `;
  container.appendChild(div);

  // Ping check
  fetch(link.url + link.ping, { mode: 'no-cors' })
    .then(() => document.getElementById(`ping-${link.name.replace(/\W/g,'')}`).classList.add('bg-green-500','dot'))
    .catch(() => document.getElementById(`ping-${link.name.replace(/\W/g,'')}`).classList.add('bg-rose-500'));
});

// Set copyright year otomatis
document.getElementById('copyright').innerHTML = `© <a href="https://www.instagram.com/iqballfarhan/" target="_blank" class="hover:text-sky-400 transition">IqballFarhan</a> ${new Date().getFullYear()}`;

// Logout
document.getElementById('logout').addEventListener('click', () => {
  // Add fade out animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-out';
  
  setTimeout(() => {
    localStorage.removeItem('auth');
    localStorage.removeItem('auth_exp');
    sessionStorage.removeItem('auth');
    window.location.href = 'login.html';
  }, 300);
});
