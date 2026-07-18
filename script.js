/* =========================================================
   SCRIPT.JS — Andi Setiawan Personal Profile
   Struktur file ini:
   1. Konfigurasi (mudah diedit oleh pengguna)
   2. Preloader
   3. AOS init
   4. Navbar (scroll state, toggle mobile, smooth scroll, active link)
   5. Scroll progress bar
   6. Cursor glow
   7. Back to top
   8. Star / particle background di hero
   9. Galeri + Lightbox
   10. Typing effect (halaman spesial)
   11. Floating hearts
   12. Quote slider
   13. Music player
========================================================= */

/* ================= 1. KONFIGURASI ================= */
// Untuk menambah foto baru: taruh gambar di folder assets/images/
// lalu tambahkan nama filenya di array ini. Urutan array = urutan tampil.
const galleryImages = [
  "assets/images/1693626862697_jx1kwb_2_0.jpg",
  "assets/images/84ec36e42b96daef6e7397e6e1e238ab.jpg",
  "assets/images/IMG_20230623_060708.jpg",
  "assets/images/file_00000000ca54720793a22e3887c51c2a.png",
  "assets/images/quality_restoration_20260421200111919.jpg",
  "assets/images/quality_restoration_20260627185733270.jpg"
];

// Kalimat yang akan diketik otomatis di bagian "Untuk Seseorang yang Aku Kagumi"
const specialMessage =
  "Di antara ribuan langkah yang pernah kulewati, ada satu sosok yang selalu membuat dunia terasa lebih indah. " +
  "Senyummu sederhana, namun mampu menenangkan hati. Mungkin kau tak pernah menyadari, tetapi kehadiranmu telah " +
  "menjadi inspirasi bagi banyak doa dan harapan. Aku tidak berharap menjadi alasan di balik senyummu, tetapi aku " +
  "selalu berharap semoga hidupmu dipenuhi kebahagiaan. Terima kasih telah menjadi seseorang yang tanpa sadar " +
  "mengajarkanku arti mengagumi dengan tulus.";

// Daftar quote romantis yang akan berganti otomatis
const quotes = [
  { text: "Cinta yang tulus tidak selalu harus memiliki, cukup dengan mendoakan yang terbaik.", author: "Andi Setiawan" },
  { text: "Kadang, mengagumi dari jauh adalah bentuk kasih sayang yang paling sederhana.", author: "Andi Setiawan" },
  { text: "Kebahagiaanmu adalah salah satu doa yang paling sering kubisikkan.", author: "Andi Setiawan" },
  { text: "Setiap kenangan indah layak untuk dirawat, meski waktu terus berjalan.", author: "Andi Setiawan" },
  { text: "Terkadang, senyum sederhana mampu menyembuhkan hari yang paling melelahkan.", author: "Andi Setiawan" }
];

/* ================= 2. PRELOADER ================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  // beri jeda sedikit agar animasi teks sempat terlihat sebelum menghilang
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 1800);
});

/* ================= 3. AOS INIT ================= */
if (window.AOS) {
  AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 60
  });
}

/* ================= 4. NAVBAR ================= */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");

// Ubah tampilan navbar saat halaman discroll
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Buka / tutup menu mobile (hamburger)
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Tutup menu mobile setelah link diklik
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// Highlight link aktif sesuai section yang sedang terlihat
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinkItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

/* ================= 5. SCROLL PROGRESS BAR ================= */
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = height > 0 ? (scrollTop / height) * 100 : 0;
  scrollProgress.style.width = percent + "%";
});

/* ================= 6. CURSOR GLOW ================= */
const cursorGlow = document.getElementById("cursor-glow");
window.addEventListener("pointermove", (e) => {
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

/* ================= 7. BACK TO TOP ================= */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ================= 8. STAR / PARTICLE BACKGROUND (HERO) ================= */
// Membuat efek "bintang bergerak" halus di belakang hero section
const starCanvas = document.getElementById("starCanvas");
const ctx = starCanvas.getContext("2d");
let stars = [];
let heroEl = document.getElementById("hero");

function resizeCanvas() {
  starCanvas.width = heroEl.offsetWidth;
  starCanvas.height = heroEl.offsetHeight;
  const density = Math.min(140, Math.floor((starCanvas.width * starCanvas.height) / 9000));
  stars = Array.from({ length: density }, () => createStar());
}

function createStar() {
  return {
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: Math.random() * 1.6 + 0.4,
    speed: Math.random() * 0.25 + 0.05,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinklePhase: Math.random() * Math.PI * 2,
    hue: Math.random() > 0.5 ? "167,139,250" : "255,111,181" // ungu / pink neon
  };
}

function animateStars() {
  ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach((s) => {
    s.twinklePhase += s.twinkleSpeed;
    const alpha = 0.4 + Math.sin(s.twinklePhase) * 0.35;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${s.hue}, ${Math.max(0.15, alpha)})`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(${s.hue}, 0.8)`;
    ctx.fill();

    // gerak naik pelan, lalu kembali ke bawah (efek melayang)
    s.y -= s.speed;
    if (s.y < -4) {
      s.y = starCanvas.height + 4;
      s.x = Math.random() * starCanvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();
window.addEventListener("resize", resizeCanvas);

// Efek parallax halus pada foto profil saat pointer bergerak di hero
const heroPhotoWrap = document.querySelector(".hero-photo-wrap");
heroEl.addEventListener("pointermove", (e) => {
  const rect = heroEl.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width - 0.5;
  const relY = (e.clientY - rect.top) / rect.height - 0.5;
  heroPhotoWrap.style.transform = `translate(${relX * 14}px, ${relY * 14}px)`;
});
heroEl.addEventListener("pointerleave", () => {
  heroPhotoWrap.style.transform = "translate(0, 0)";
});

/* ================= 9. GALERI + LIGHTBOX ================= */
const galleryGrid = document.getElementById("galleryGrid");

// Bangun grid galeri secara dinamis dari array galleryImages di atas
galleryImages.forEach((src, index) => {
  const item = document.createElement("div");
  item.className = "gallery-item";
  item.setAttribute("data-aos", "zoom-in");
  item.setAttribute("data-aos-delay", String((index % 6) * 80));
  item.innerHTML = `
    <img src="${src}" alt="Foto galeri ${index + 1}" loading="lazy">
    <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
  `;
  item.addEventListener("click", () => openLightbox(index));
  galleryGrid.appendChild(item);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  lightboxImg.src = galleryImages[index];
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}
function showImage(step) {
  currentImageIndex = (currentImageIndex + step + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showImage(-1));
lightboxNext.addEventListener("click", () => showImage(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(-1);
  if (e.key === "ArrowRight") showImage(1);
});

/* ================= 10. TYPING EFFECT (HALAMAN SPESIAL) ================= */
const typingText = document.getElementById("typingText");
const typingCursor = document.getElementById("typingCursor");
let typingStarted = false;

function typeMessage(text, el, speed = 26) {
  let i = 0;
  (function typeChar() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    } else {
      // hentikan kedipan cursor menjadi statis setelah selesai mengetik
      typingCursor.style.animation = "none";
      typingCursor.style.opacity = "0.6";
    }
  })();
}

// Mulai efek mengetik hanya ketika section spesial masuk ke layar
const specialObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !typingStarted) {
        typingStarted = true;
        typeMessage(specialMessage, typingText);
      }
    });
  },
  { threshold: 0.35 }
);
specialObserver.observe(document.getElementById("special"));

/* ================= 11. FLOATING HEARTS ================= */
const floatingHeartsContainer = document.getElementById("floatingHearts");

function spawnHeart() {
  const heart = document.createElement("i");
  heart.className = "fa-solid fa-heart heart";
  const size = Math.random() * 14 + 10;
  const left = Math.random() * 100;
  const duration = Math.random() * 6 + 7;
  const drift = (Math.random() - 0.5) * 120;

  heart.style.left = left + "%";
  heart.style.fontSize = size + "px";
  heart.style.setProperty("--drift", drift + "px");
  heart.style.animationDuration = duration + "s";

  floatingHeartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// Hanya jalankan animasi hati saat section spesial terlihat (hemat resource)
let heartInterval = null;
const heartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!heartInterval) heartInterval = setInterval(spawnHeart, 700);
    } else {
      clearInterval(heartInterval);
      heartInterval = null;
    }
  });
}, { threshold: 0.1 });
heartObserver.observe(document.getElementById("special"));

/* ================= 12. QUOTE SLIDER ================= */
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteDots = document.getElementById("quoteDots");
let quoteIndex = 0;

// Buat titik indikator sesuai jumlah quote
quotes.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "quote-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => setQuote(i));
  quoteDots.appendChild(dot);
});

function setQuote(index) {
  quoteIndex = index;
  quoteText.classList.add("quote-fade-out");
  setTimeout(() => {
    quoteText.textContent = `"${quotes[quoteIndex].text}"`;
    quoteAuthor.textContent = `— ${quotes[quoteIndex].author}`;
    quoteText.classList.remove("quote-fade-out");
    document.querySelectorAll(".quote-dot").forEach((d, i) => {
      d.classList.toggle("active", i === quoteIndex);
    });
  }, 300);
}

setQuote(0);
setInterval(() => setQuote((quoteIndex + 1) % quotes.length), 5000);

/* ================= 13. MUSIC PLAYER ================= */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicPanel = document.getElementById("musicPanel");
const musicPlayBtn = document.getElementById("musicPlayBtn");
const playIcon = document.getElementById("playIcon");
const musicStatus = document.getElementById("musicStatus");
const musicDisc = document.getElementById("musicDisc");
const volumeSlider = document.getElementById("volumeSlider");

bgMusic.volume = 0.5;

// Tombol musik mengambang: klik untuk buka/tutup panel kontrol
musicToggle.addEventListener("click", () => {
  musicPanel.classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (!document.getElementById("musicPlayer").contains(e.target)) {
    musicPanel.classList.remove("open");
  }
});

function playMusic() {
  bgMusic.play().then(() => {
    playIcon.className = "fa-solid fa-pause";
    musicStatus.textContent = "Sedang diputar";
    musicDisc.classList.add("playing");
  }).catch(() => {
    // Browser memblokir autoplay tanpa interaksi pengguna — ini wajar & aman diabaikan
    musicStatus.textContent = "Ketuk untuk memutar";
  });
}
function pauseMusic() {
  bgMusic.pause();
  playIcon.className = "fa-solid fa-play";
  musicStatus.textContent = "Dijeda";
  musicDisc.classList.remove("playing");
}

musicPlayBtn.addEventListener("click", () => {
  if (bgMusic.paused) playMusic(); else pauseMusic();
});
volumeSlider.addEventListener("input", (e) => {
  bgMusic.volume = parseFloat(e.target.value);
});

// Coba putar otomatis saat halaman dibuka (mengikuti kebijakan autoplay browser).
// Jika diblokir, musik akan menunggu ketukan pertama pengguna di layar.
window.addEventListener("load", () => {
  setTimeout(() => {
    playMusic();
  }, 2000);
});
document.body.addEventListener(
  "click",
  () => {
    if (bgMusic.paused && bgMusic.currentTime === 0) playMusic();
  },
  { once: true }
);

/* ================= RIPPLE EFFECT UNTUK TOMBOL ================= */
document.querySelectorAll(".btn-ripple").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});
