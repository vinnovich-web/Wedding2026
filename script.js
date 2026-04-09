const music = document.getElementById('music');
const playBtn = document.getElementById('playBtn');
const flowerProgress = document.getElementById('flowerProgress');
const progressContainer = document.getElementById('progressContainer');
const volume = document.getElementById('volume');
const bg = document.getElementById('bg');

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

/* CLICK TO SEEK */
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    music.currentTime = percent * music.duration;
});

/* VOLUME */
volume.addEventListener('input', () => {
    music.volume = volume.value;
});

/* PARALLAX */
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    bg.style.transform = `translateY(${scrollY * 0.12}px)`;
});