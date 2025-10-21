# 🚀 Quick Reference Guide

## 📁 File Locations

### HTML Files
- **Dashboard**: `html/index.html`
- **Login**: `html/login.html`
- **Testing**: `html/test.html`

### CSS Files
- **Dashboard Style**: `html/css/index.css`
- **Login Style**: `html/css/login.css`

### JavaScript Files
- **Dashboard Logic**: `html/js/index.js`
- **Login Logic**: `html/js/login.js`

---

## 🔧 Common Tasks

### 1. Menambah Service Link Baru

Edit file: `html/js/index.js`

```javascript
const LINKS = [
  // ... existing links
  { 
    name: "Nama Service Baru", 
    url: "https://service.domain.com", 
    desc: "Deskripsi singkat service", 
    icon: "🔥",              // Emoji icon
    tag: "Public",           // atau "LAN", "Remote", dll
    ping: "/"                // endpoint untuk ping check
  }
];
```

### 2. Mengubah Kredensial Login

Edit file: `html/js/login.js`

```javascript
// Ganti di baris 1-2
const USER = "username_baru";
const PASS = "password_baru";
```

### 3. Mengedit Styling Dashboard

Edit file: `html/css/index.css`

Contoh mengubah warna card:
```css
.glass {
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  /* Ubah nilai rgba untuk warna berbeda */
}
```

### 4. Mengedit Styling Login

Edit file: `html/css/login.css`

### 5. Mengubah Port Web Server

Edit file: `docker-compose.yml`

```yaml
ports:
  - "100:80"  # Ganti 100 dengan port yang diinginkan
```

### 6. Menambah Animasi Baru

Edit file CSS yang sesuai, tambahkan keyframe:

```css
@keyframes namaAnimasi {
  from { opacity: 0; }
  to { opacity: 1; }
}

.class-target {
  animation: namaAnimasi 1s ease-out;
}
```

---

## 🎨 Kustomisasi Cepat

### Mengubah Warna Tema

Edit CSS, cari dan ganti:
- **Sky Blue**: `#0ea5e9`, `#38bdf8` → Warna utama
- **Slate**: `#1e293b`, `#0f172a` → Background
- **Rose**: `#ef4444`, `#dc2626` → Error/Logout

### Mengubah Durasi Animasi

Cari di CSS:
```css
animation: namaAnimasi 0.5s ease-out;
                      /* ^ ubah durasi */
```

### Mengubah Loading Screen Text

Edit file HTML terkait:
```html
<p class="loading-text">Loading Dashboard...</p>
<!-- Ganti text sesuai keinginan -->
```

---

## 🐛 Troubleshooting

### CSS Tidak Muncul

1. Cek path di HTML: `<link href="css/index.css">`
2. Pastikan file CSS ada di folder yang benar
3. Hard refresh browser: `Ctrl + Shift + R`

### JavaScript Tidak Jalan

1. Cek path di HTML: `<script src="js/index.js"></script>`
2. Buka DevTools Console (F12) untuk lihat error
3. Pastikan script di-load sebelum `</body>`

### Login Tidak Berfungsi

1. Cek kredensial di `js/login.js`
2. Buka DevTools Console untuk error
3. Clear browser cache & cookies

### Animasi Tidak Smooth

1. Pastikan browser support CSS animations
2. Check GPU acceleration browser
3. Reduce animation complexity untuk performa

---

## 📝 Development Workflow

### Local Development

1. Edit file yang diperlukan
2. Refresh browser untuk melihat perubahan
3. Test di berbagai browser

### Deploy ke Server

```bash
# Via Docker Compose
cd stack/
docker-compose down
docker-compose up -d --build

# Via Portainer
# Push to GitHub, then redeploy stack
```

---

## 🔍 Testing

### Manual Testing

1. Buka `html/test.html` di browser
2. Cek semua resource: ✓ OK
3. Test login flow
4. Test semua link service
5. Test responsive di mobile

### Browser Testing

Test di:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 📚 File Reference

| File | Baris | Fungsi Utama |
|------|-------|--------------|
| `index.html` | 45 | Struktur dashboard |
| `login.html` | 120 | Struktur login |
| `index.css` | 250+ | Style & animasi dashboard |
| `login.css` | 200+ | Style & animasi login |
| `index.js` | 100+ | Logic dashboard, ping, links |
| `login.js` | 130+ | Logic login, auth, validation |

---

## 💡 Tips & Tricks

1. **Performance**: Minify CSS & JS untuk production
2. **Security**: Ganti kredensial default!
3. **Backup**: Backup file sebelum edit besar
4. **Version Control**: Gunakan Git untuk tracking
5. **Documentation**: Update README saat ada perubahan

---

## 🆘 Need Help?

1. Check dokumentasi lengkap di `html/README.md`
2. Lihat changelog di `CHANGELOG.md`
3. Contact: [@iqballfarhan](https://www.instagram.com/iqballfarhan/)

---

**Last Updated**: 21 Oktober 2025
**Version**: 2.0
