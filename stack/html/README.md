# Landing Page Mini Server

Landing page sederhana untuk mengelola dan mengakses layanan mini server.

## 📁 Struktur File

```
html/
├── css/
│   ├── index.css       # Stylesheet untuk halaman dashboard
│   └── login.css       # Stylesheet untuk halaman login
├── js/
│   ├── index.js        # JavaScript untuk halaman dashboard
│   └── login.js        # JavaScript untuk halaman login
├── index.html          # Halaman dashboard utama
├── login.html          # Halaman login
└── README.md          # Dokumentasi ini
```

## 🚀 Cara Deploy

### Menggunakan Docker Compose

1. Pastikan Docker dan Docker Compose sudah terinstall
2. Navigasi ke folder `stack`
3. Jalankan perintah:
   ```bash
   docker-compose up -d
   ```
4. Akses web di `http://localhost:100` atau IP server Anda

### Menggunakan Nginx Manual

Jika ingin deploy tanpa Docker:

1. Install Nginx
2. Copy folder `html` ke `/usr/share/nginx/html` atau folder web server Anda
3. Restart Nginx

## 🔐 Kredensial Login

- **Username**: iqbal
- **Password**: 16021998

> ⚠️ **PENTING**: Ganti kredensial di file `js/login.js` sebelum deploy ke production!

## ✨ Fitur

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

- **HTML5** - Struktur halaman
- **CSS3** - Styling & animasi
- **JavaScript (Vanilla)** - Logika aplikasi
- **Tailwind CSS** - Framework CSS utility
- **Docker** - Containerization
- **Nginx** - Web server

## 🛠️ Kustomisasi

### Menambah/Edit Link Layanan

Edit array `LINKS` di file `js/index.js`:

```javascript
const LINKS = [
  { 
    name: "Nama Layanan", 
    url: "https://url-layanan.com", 
    desc: "Deskripsi singkat", 
    icon: "🎮", 
    tag: "Public", 
    ping: "/" 
  },
  // tambah layanan lainnya...
];
```

### Mengganti Kredensial Login

Edit konstanta di file `js/login.js`:

```javascript
const USER = "username_baru";
const PASS = "password_baru";
```

### Mengedit CSS

- Edit `css/index.css` untuk styling dashboard
- Edit `css/login.css` untuk styling login

## 📝 Catatan

- Port default: 100 (bisa diubah di `docker-compose.yml`)
- File read-only mounting untuk keamanan
- Session auth menggunakan localStorage/sessionStorage
- Ping check menggunakan `no-cors` mode

## 👤 Author

**IqballFarhan**
- Instagram: [@iqballfarhan](https://www.instagram.com/iqballfarhan/)

---

© 2025 IqballFarhan. All rights reserved.
