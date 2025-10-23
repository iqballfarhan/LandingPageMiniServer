/* ========================================
   Mini Server Dashboard Pro - JavaScript
   ======================================== */

// === Auth Check ===
if (!sessionStorage.getItem('auth') && !localStorage.getItem('auth')) {
  window.location.href = 'login.html';
}

// === Stars Animation ===
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

// === Services Data ===
const LINKS = [
  { 
    name: "Twitch Drop Miner #1", 
    url: "https://twitchdrop.iqballfarhan.web.id/", 
    desc: "EndlessKnight", 
    icon: "🎮", 
    tag: "Public", 
    ping: "/" 
  },
  { 
    name: "Twitch Drop Miner #2", 
    url: "https://twitchdrop2.iqballfarhan.web.id/", 
    desc: "IqballFarhan", 
    icon: "🎮", 
    tag: "Public", 
    ping: "/" 
  },
  { 
    name: "Twitch Drop Miner #3", 
    url: "https://bekgor.iqballfarhan.web.id/", 
    desc: "Bekgor.", 
    icon: "🎮", 
    tag: "Public", 
    ping: "/" 
  },
  { 
    name: "Portainer (Domain)", 
    url: "https://portainer.iqballfarhan.web.id/#!/auth", 
    desc: "UI Portainer via domain & reverse proxy.", 
    icon: "🗂️", 
    tag: "Public", 
    ping: "/favicon.ico" 
  },
  { 
    name: "Portainer (LAN)", 
    url: "http://192.168.1.17:9000/#!/auth", 
    desc: "UI manajemen Docker lokal.", 
    icon: "🛠️", 
    tag: "LAN", 
    ping: "/favicon.ico" 
  },
  { 
    name: "Beszel", 
    url: "https://beszel.iqballfarhan.web.id/", 
    desc: "Beszel server: monitoring & kontrol container.", 
    icon: "📈", 
    tag: "Public", 
    ping: "/" 
  },
  { 
    name: "Speedtest", 
    url: "https://speedtest.iqballfarhan.web.id/", 
    desc: "LibreSpeed mandiri untuk uji jaringan.", 
    icon: "🚀", 
    tag: "Public", 
    ping: "/" 
  },
  { 
    name: "GitHub Heartbeat", 
    url: "https://gh-heartbeat.iqballfarhan.web.id/", 
    desc: "GitHub activity monitoring & contribution tracker.", 
    icon: "💚", 
    tag: "Public", 
    ping: "/" 
  },
  { 
    name: "Web SSH Terminal", 
    url: "https://ssh.iqballfarhan.web.id/", 
    desc: "Akses terminal Ubuntu mini-server.", 
    icon: "💻", 
    tag: "Remote", 
    ping: "/" 
  },
  { 
    name: "Cloudflare Tunnel", 
    url: "https://one.dash.cloudflare.com/64c507993f50bbbaca60d7df59e7486e/networks/tunnels", 
    desc: "Panel Cloudflare Zero Trust.", 
    icon: "☁️", 
    tag: "Cloud", 
    ping: "/" 
  },
  { 
    name: "Cloudflare Access Apps", 
    url: "https://one.dash.cloudflare.com/64c507993f50bbbaca60d7df59e7486e/access/apps", 
    desc: "Cloudflare Access - manage protected apps.", 
    icon: "🔐", 
    tag: "Cloud", 
    ping: "/" 
  },
  { 
    name: "Cloudflare Caching", 
    url: "https://dash.cloudflare.com/64c507993f50bbbaca60d7df59e7486e/iqballfarhan.web.id/caching/configuration", 
    desc: "Caching configuration for iqballfarhan.web.id.", 
    icon: "🗄️", 
    tag: "Cloud", 
    ping: "/" 
  }
];

// === State Management ===
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentFilter = 'all';
let searchQuery = '';
let serviceStats = {};

// === Toast Notification ===
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-size: 24px;">${type === 'error' ? '⚠️' : 'ℹ️'}</span>
    <div style="flex: 1;">
      <div style="font-weight: 600; margin-bottom: 4px;">
        ${type === 'error' ? 'Error' : 'Info'}
      </div>
      <div style="font-size: 13px;">${message}</div>
    </div>
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// === Render Services ===
function renderServices() {
  const container = document.getElementById('links');
  container.innerHTML = '';
  
  // Filter services
  let filtered = LINKS.filter(link => {
    const matchesSearch = 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      currentFilter === 'all' || 
      (currentFilter === 'favorites' && favorites.includes(link.name)) ||
      link.tag === currentFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Sort: favorites first
  filtered.sort((a, b) => {
    const aFav = favorites.includes(a.name);
    const bFav = favorites.includes(b.name);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  // Render each service card
  filtered.forEach((link, index) => {
    const isFavorite = favorites.includes(link.name);
    const div = document.createElement('div');
    div.className = 'glass slide-up';
    div.style = `padding: 20px; border-radius: 16px; cursor: pointer; animation-delay: ${index * 0.05}s;`;
    div.dataset.name = link.name;
    div.dataset.tag = link.tag;
    
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
        <span style="font-size: 32px;">${link.icon}</span>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="favorite-btn ${isFavorite ? 'active' : ''}" 
                data-name="${link.name}" 
                style="font-size: 20px;">
            ${isFavorite ? '⭐' : '☆'}
          </span>
          <span style="font-size: 10px; padding: 4px 8px; border-radius: 12px; background: var(--glass-bg); text-transform: uppercase; font-weight: 600;">
            ${link.tag}
          </span>
        </div>
      </div>
      <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
        ${link.name}
      </h2>
      <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">
        ${link.desc}
      </p>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <a href="${link.url}" 
           target="_blank" 
           style="color: var(--accent); font-size: 14px; font-weight: 500; text-decoration: none;" 
           onclick="event.stopPropagation();">
          Buka →
        </a>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="latency" id="latency-${link.name.replace(/\W/g, '')}"></span>
          <span class="ping-dot" 
                id="ping-${link.name.replace(/\W/g, '')}" 
                style="background: #6b7280;"></span>
        </div>
      </div>
    `;
    
    container.appendChild(div);
    checkService(link);
  });

  updateStats();
}

// === Check Service Status & Latency ===
async function checkService(link) {
  const pingId = `ping-${link.name.replace(/\W/g, '')}`;
  const latencyId = `latency-${link.name.replace(/\W/g, '')}`;
  const pingEl = document.getElementById(pingId);
  const latencyEl = document.getElementById(latencyId);
  
  if (!pingEl) return;

  const startTime = Date.now();
  
  try {
    await fetch(link.url + link.ping, { mode: 'no-cors' });
    const latency = Date.now() - startTime;
    
    pingEl.style.background = '#22c55e';
    pingEl.classList.add('active');
    
    if (latencyEl) {
      latencyEl.textContent = `${latency}ms`;
      latencyEl.className = 'latency';
      
      if (latency < 200) {
        latencyEl.classList.add('fast');
      } else if (latency < 500) {
        latencyEl.classList.add('medium');
      } else {
        latencyEl.classList.add('slow');
      }
    }
    
    serviceStats[link.name] = { online: true, latency };
  } catch (err) {
    pingEl.style.background = '#ef4444';
    if (latencyEl) latencyEl.textContent = 'offline';
    serviceStats[link.name] = { online: false, latency: 0 };
  }
  
  updateStats();
}

// === Update Stats ===
function updateStats() {
  const total = LINKS.length;
  const online = Object.values(serviceStats).filter(s => s.online).length;
  const offline = total - online;
  const avgLatency = online > 0 
    ? Math.round(
        Object.values(serviceStats)
          .filter(s => s.online)
          .reduce((sum, s) => sum + s.latency, 0) / online
      )
    : 0;

  document.getElementById('total-services').textContent = total;
  document.getElementById('online-services').textContent = online;
  document.getElementById('offline-services').textContent = offline;
  document.getElementById('avg-latency').textContent = 
    online > 0 ? `${avgLatency} ms` : '-- ms';
}

// === Favorites Handler ===
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('favorite-btn')) {
    const name = e.target.dataset.name;
    const index = favorites.indexOf(name);
    
    if (index > -1) {
      favorites.splice(index, 1);
      e.target.textContent = '☆';
      e.target.classList.remove('active');
      showToast(`${name} removed from favorites`);
    } else {
      favorites.push(name);
      e.target.textContent = '⭐';
      e.target.classList.add('active');
      showToast(`${name} added to favorites`);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    if (currentFilter === 'favorites') {
      renderServices();
    }
  }
});

// === Search Handler ===
document.getElementById('search').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderServices();
});

// === Filter Handlers ===
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderServices();
  });
});

// === Settings Panel Handlers ===
document.getElementById('settings-btn').addEventListener('click', () => {
  document.getElementById('settings-panel').classList.add('open');
});

document.getElementById('close-settings').addEventListener('click', () => {
  document.getElementById('settings-panel').classList.remove('open');
});

// === Theme Toggle ===
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  
  document.getElementById('theme-text').textContent = 
    isLight ? '☀️ Light Mode' : '🌙 Dark Mode';
  
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  showToast(`Switched to ${isLight ? 'Light' : 'Dark'} Mode`);
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  document.getElementById('theme-text').textContent = '☀️ Light Mode';
}

// === UI Version Switcher ===
document.getElementById('switch-to-old').addEventListener('click', () => {
  showToast('Switching to Classic UI...');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
});

document.getElementById('switch-to-new').addEventListener('click', () => {
  showToast('You are already on Pro UI!');
});

// === Logout Handler ===
document.getElementById('logout').addEventListener('click', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-out';
  
  setTimeout(() => {
    localStorage.removeItem('auth');
    localStorage.removeItem('auth_exp');
    sessionStorage.removeItem('auth');
    window.location.href = 'login.html';
  }, 300);
});

// === Copyright ===
document.getElementById('copyright').innerHTML = `
  © <a href="https://www.instagram.com/iqballfarhan/" 
       target="_blank" 
       style="color: var(--accent); text-decoration: none;">
    IqballFarhan
  </a> ${new Date().getFullYear()}
`;

// === Initialize on Page Load ===
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    renderServices();
  }, 1500);
});

// === Auto-refresh Ping (Every 60 seconds) ===
setInterval(() => {
  LINKS.forEach(link => checkService(link));
}, 60000);
