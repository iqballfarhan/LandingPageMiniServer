const USER = "iqbal";
const PASS = "16021998";
const u = document.getElementById('u');
const p = document.getElementById('p');
const remember = document.getElementById('remember');
const togglePass = document.getElementById('togglePass');
const eye = document.getElementById('eye');
const eyeOff = document.getElementById('eyeOff');
const forgot = document.getElementById('forgot');

// Modern Toast Notification Function
function showToast(title, message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">⚠️</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <span class="toast-close">×</span>
  `;
  
  document.body.appendChild(toast);
  
  // Show toast with animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Close button handler
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  });
  
  // Auto hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Set copyright year otomatis
document.getElementById('copyright').innerHTML = `© <a href="https://www.instagram.com/iqballfarhan/" target="_blank" class="hover:text-sky-400 transition">IqballFarhan</a> ${new Date().getFullYear()}`;

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

// Toggle password show/hide
togglePass.addEventListener('click', () => {
  const isHidden = p.type === 'password';
  p.type = isHidden ? 'text' : 'password';
  eye.classList.toggle('hidden', !isHidden);
  eyeOff.classList.toggle('hidden', isHidden);
});

// Forgot password toast
forgot.addEventListener('click', () => {
  showToast('Lupa Password?', 'Jangan kepo, ini web pribadi.');
});

function setAuth(days) {
  const token = 'ok';
  try {
    if (days && days > 0) {
      const until = Date.now() + days*24*60*60*1000;
      localStorage.setItem('auth_exp', String(until));
      localStorage.setItem('auth', token);
    } else {
      sessionStorage.setItem('auth', token);
    }
  } catch(e) {}
}

function isValid(uval, pval) { 
  return uval === USER && pval === PASS; 
}

document.getElementById('submit').addEventListener('click', () => {
  const uval = u.value.trim();
  const pval = p.value;
  
  if (!uval || !pval) { 
    showToast('Login Gagal', 'Lengkapi username & password.');
    return; 
  }
  
  if (isValid(uval, pval)) {
    if (remember.checked) setAuth(7); else setAuth(0);
    // Add transition effect before redirect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 300);
  } else {
    showToast('Login Gagal', 'Username atau password salah.');
  }
});
