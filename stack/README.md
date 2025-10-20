# LandingPageMiniServer

Landing page + login sederhana untuk mini server (Nginx). Siap deploy via **Portainer Stack → Repository**.

## Struktur
```
LandingPageMiniServer/
└─ stack/
   ├─ docker-compose.yml
   └─ html/
      ├─ index.html
      └─ login.html
```

## Cara Deploy (Portainer Repository Mode)
1. Push repo ini ke GitHub kamu.
2. Portainer → **Stacks → Add stack → Repository**:
   - **Repository URL**: (URL repo GitHub kamu)
   - **Compose path**: `stack/docker-compose.yml`
3. Klik **Deploy the stack**.
4. Akses: `http://<IP-server>:100` → login dulu (client-side).

> **Default login**: user `iqbal`, password `16021998`
> Catatan: proteksi ini client-side (untuk pembatasan ringan). Untuk publik, tambahkan Basic Auth di Nginx / reverse proxy.
