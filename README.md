# Website Profil Pribadi — Andi Setiawan

Website statis (HTML + CSS + JS murni, tanpa framework) bertema
**Glassmorphism + Modern UI + Romantic Aesthetic**, siap dibuka dan
diedit langsung di **Acode (Android)**.

## Struktur folder

```
andi-setiawan-profile/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/
    │   ├── profile.svg      → foto profil (ganti dengan fotomu)
    │   └── gallery-1..6.svg → foto galeri contoh (ganti sesukamu)
    └── music/
        └── (taruh file musikmu di sini)
```

## Cara membuka di Acode

1. Salin folder `andi-setiawan-profile` ke penyimpanan HP.
2. Buka Acode → pilih **Open Folder** → arahkan ke folder tersebut.
3. Jalankan lewat tombol **Run** (ikon ▷) di Acode, atau install
   plugin "Acode Live Preview" agar bisa lihat hasilnya langsung di HP.

## Cara mengganti foto profil

Ganti file `assets/images/profile.svg` dengan foto aslimu. Boleh
format `.jpg` / `.png` — cukup ganti nama filenya, lalu sesuaikan
baris berikut di `index.html`:

```html
<img src="assets/images/profile.svg" alt="Foto Andi Setiawan" class="hero-photo" id="heroPhoto">
```
menjadi misalnya:
```html
<img src="assets/images/profile.jpg" alt="Foto Andi Setiawan" class="hero-photo" id="heroPhoto">
```

## Cara menambah foto galeri

1. Taruh foto baru (jpg/png) ke folder `assets/images/`.
2. Buka `script.js`, cari bagian paling atas bernama `galleryImages`,
   lalu tambahkan nama file fotomu ke dalam daftar (array) tersebut:

```js
const galleryImages = [
  "assets/images/gallery-1.svg",
  "assets/images/foto-baru.jpg"   // tambahkan barismu di sini
];
```

*(Website statis tanpa server tidak bisa membaca isi folder secara
otomatis, jadi menambahkan nama file ke daftar ini adalah cara paling
sederhana dan andal.)*

## Cara memasang musik latar

1. Taruh file musik (format `.mp3`) di folder `assets/music/`,
   beri nama `background.mp3` — atau ganti nama sesukamu lalu
   sesuaikan baris `<source>` di `index.html`:

```html
<source src="assets/music/background.mp3" type="audio/mpeg">
```

2. Catatan: kebanyakan browser (termasuk browser Android) **memblokir
   autoplay musik** sebelum pengguna menyentuh layar. Website ini sudah
   menangani hal itu — musik akan otomatis mencoba diputar, dan jika
   diblokir, akan langsung diputar begitu pengguna mengetuk layar
   pertama kali. Tombol musik mengambang di kanan bawah juga tetap
   tersedia untuk play/pause dan atur volume secara manual.

## Mengganti isi teks

- Nama, tagline hero → cari `<section id="hero">` di `index.html`.
- Teks "Tentang Saya" → cari `<section id="about">`.
- Pesan untuk seseorang yang dikagumi → variabel `specialMessage`
  di bagian atas `script.js`.
- Daftar quote romantis → variabel `quotes` di `script.js`.
- Link sosial media → cari `<section id="social">` di `index.html`,
  ganti URL Instagram/Facebook/TikTok/WhatsApp/Email sesuai akunmu.

Selamat berkarya! 💜
