const gift = document.getElementById("gift");
const intro = document.getElementById("intro");
const reveal = document.getElementById("reveal");
const whiteout = document.getElementById("whiteout");

const clickSound = document.getElementById("clickSound");
const popSound = document.getElementById("popSound");
const music = document.getElementById("music");

let opening = false;
let rgbTimer;

function playSound(audio) {
  audio.currentTime = 0;
  const promise = audio.play();
  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {
      // Browser mungkin menahan audio; interaksi klik berikutnya bisa mengizinkan pemutaran.
    });
  }
}

function openGift() {
  if (opening) return;
  opening = true;
  gift.disabled = true;

  // Audio dimulai dari klik pengguna agar tidak diblokir browser.
  playSound(clickSound);
  gift.classList.add("shaking");

  window.setTimeout(() => {
    gift.classList.remove("shaking");
    gift.classList.add("opened");
    playSound(popSound);
  }, 1250);

  window.setTimeout(() => {
    // Layar putih menutupi halaman selama 3 detik.
    whiteout.classList.remove("hidden");
    music.volume = 0.65;
    music.currentTime = 0;
    playSound(music);
  }, 1900);

  window.setTimeout(() => {
    intro.classList.add("hidden");
    whiteout.classList.add("hidden");
    reveal.classList.remove("hidden");
    startRgbBackground();
  }, 4900); // 1,9 detik sebelum putih + 3 detik putih
}

function startRgbBackground() {
  const page = document.getElementById("page");
  let hue = 0;
  rgbTimer = window.setInterval(() => {
    hue = (hue + 1) % 360;
    page.style.backgroundColor = `hsl(${hue} 90% 78%)`;
    // Lapisan foto tetap terlihat, warna RGB muncul sebagai warna dasar/tepi.
  }, 45);
}

gift.addEventListener("click", openGift);

// Tautan Rickroll sudah dipasang langsung di HTML.
// Hentikan perubahan warna bila halaman ditinggalkan.
window.addEventListener("pagehide", () => {
  if (rgbTimer) window.clearInterval(rgbTimer);
});
