# LandingPageMiniServer

Landing page + login sederhana untuk mini server (Nginx). Siap deploy via **Portainer Stack → Repository**.

## 📁 Struktur
```
LandingPageMiniServer/
└─ stack/
   ├─ docker-compose.yml
   ├─ .gitignore
   └─ html/
      ├─ css/
      │  ├─ index.css      # Stylesheet dashboard
      │  └─ login.css      # Stylesheet login
      ├─ js/
      │  ├─ index.js       # JavaScript dashboard
      │  └─ login.js       # JavaScript login
      ├─ index.html        # Halaman dashboard
      ├─ login.html        # Halaman login
      └─ README.md         # Dokumentasi lengkap
```

## 🚀 Cara Deploy (Portainer Repository Mode)
1. Push repo ini ke GitHub kamu.
2. Portainer → **Stacks → Add stack → Repository**:
   - **Repository URL**: (URL repo GitHub kamu)
   - **Compose path**: `stack/docker-compose.yml`
3. Klik **Deploy the stack**.
4. Akses: `http://<IP-server>:100` → login dulu (client-side).

> **Default login**: user ``, password ``
> 
> ⚠️ **Catatan Keamanan**: Proteksi ini client-side (untuk pembatasan ringan). Untuk publik, tambahkan Basic Auth di Nginx / reverse proxy.

## ✨ Fitur
- ✅ CSS & JavaScript terpisah (modular)
- ✅ Halaman login dengan autentikasi
- ✅ Dashboard dengan grid link layanan
- ✅ Ping status checker untuk setiap layanan
- ✅ Animasi modern & smooth
- ✅ Background bintang animasi
- ✅ Loading screen
- ✅ Responsive design
- ✅ Remember me (7 hari)
- ✅ Toast notification modern

## 🎨 Teknologi
- HTML5, CSS3, JavaScript (Vanilla)
- Tailwind CSS (via CDN)
- Docker + Nginx
- Canvas API untuk animasi bintang

## 📝 Kustomisasi

Lihat dokumentasi lengkap di `html/README.md` untuk:
- Menambah/edit link layanan
- Mengganti kredensial login
- Mengedit styling & animasi

## 👤 Author
**IqballFarhan**
- Instagram: [@iqballfarhan](https://www.instagram.com/iqballfarhan/)

---
© 2025 IqballFarhan
