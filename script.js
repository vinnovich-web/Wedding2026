const music = document.getElementById('music');
const playBtn = document.getElementById('playBtn');
const flowerProgress = document.getElementById('flowerProgress');
const volume = document.getElementById('volume');

music.volume = volume.value;

/* PLAY / PAUSE */
let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    music.play();
    playBtn.textContent = "❚❚";
    isPlaying = true;
  } else {
    music.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
  }
});

/* PROGRESS */
const pathLength = flowerProgress.getTotalLength();
flowerProgress.style.strokeDasharray = pathLength;
flowerProgress.style.strokeDashoffset = pathLength;

music.addEventListener('timeupdate', () => {
  if (music.duration) {
    const progress = music.currentTime / music.duration;
    flowerProgress.style.strokeDashoffset = pathLength * (1 - progress);
  }
});

/* VOLUME */
volume.addEventListener('input', () => {
  music.volume = volume.value;
});

/* ========================= */
/* 🔥 COUNTDOWN */
/* ========================= */

const targetDate = new Date("2026-06-19T14:00:00+02:00").getTime();

function formatNumber(num) {
  return String(num).padStart(2, "0");
}

function createDigits(num) {
  return formatNumber(num)
    .split("")
    .map(d => `<div class="digit">${d}</div>`)
    .join("");
}

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "❤️ Het is zover!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerHTML = `
    <div class="time-block">
      <div class="digits">${createDigits(days)}</div>
      <div class="label">Days</div>
    </div>
    <div class="time-block">
      <div class="digits">${createDigits(hours)}</div>
      <div class="label">Hours</div>
    </div>
    <div class="time-block">
      <div class="digits">${createDigits(minutes)}</div>
      <div class="label">Minutes</div>
    </div>
    <div class="time-block">
      <div class="digits">${createDigits(seconds)}</div>
      <div class="label">Seconds</div>
    </div>
  `;
}

/* start */
updateCountdown();
setInterval(updateCountdown, 1000);