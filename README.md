# 🌙 APGN - Platform Digital

Platform digital untuk **Asosiasi Pengusaha Global Nusantara (APGN)** - komunitas pengusaha muslim Indonesia.

![APGN Platform](https://img.shields.io/badge/Status-Prototype-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

## 🎯 Tentang Project

Platform ini dirancang untuk mengkonsolidasikan pengusaha muslim Indonesia agar dapat berkolaborasi, bertumbuh, dan berkontribusi melalui wakaf produktif.

### Sasaran Platform:
- ✅ Mendata seluruh anggota APGN di seluruh Indonesia
- ✅ Mengklasifikasi kelas anggota (E1/E2/E3) berdasarkan omzet
- ✅ Mendata dampak/penerima manfaat dari bisnis anggota
- ✅ Menyediakan ekosistem pembelajaran dan kolaborasi bisnis

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 🏠 **Landing Page** | Halaman utama dengan informasi APGN |
| 👥 **Direktori Anggota** | List anggota publik dengan filter |
| 📝 **Self Assessment** | Klasifikasi kelas otomatis berdasarkan omzet |
| 📚 **LMS / Kursus** | Pembelajaran terstruktur sesuai kelas |
| 🤝 **Pusat Kolaborasi** | Peluang bisnis dari jaringan APGN |
| 📊 **Admin Dashboard** | Statistik dan monitoring organisasi |

## 🏷️ Klasifikasi Kelas

| Kelas | Kriteria | Akses Kursus |
|-------|----------|--------------|
| E1 - Pemula | Omzet < Rp 100 Juta/tahun | Level E1 |
| E2 - UMKM | Omzet Rp 100 Juta - 5 Miliar/tahun | Level E1 + E2 |
| E3 - Menengah-Besar | Omzet > Rp 5 Miliar/tahun | Semua Level |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/USERNAME/apgn-platform.git

# Masuk ke folder project
cd apgn-platform

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka http://localhost:5173 di browser Anda.

### Build for Production

```bash
npm run build
```

## 🔐 Demo Account

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@apgn.id | admin123 |
| Member | Register baru | - |

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: LocalStorage (prototype)

## 📁 Project Structure

```
apgn-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📝 Catatan Prototype

> ⚠️ **Ini adalah prototype untuk demonstrasi**

- Data menggunakan dummy data
- Backend menggunakan localStorage
- Video player masih placeholder
- Untuk production, akan diintegrasikan dengan proper backend

## 🚀 Deployment

Project ini dapat di-deploy ke:
- [Vercel](https://vercel.com) (Recommended)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

### Deploy ke Vercel (Paling Mudah)

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Deploy otomatis!

## 📄 License

© 2025 APGN - Asosiasi Pengusaha Global Nusantara

---

**Dibuat dengan ❤️ untuk Pengusaha Muslim Indonesia**
