// =====================================
// BIRTHDAY SURPRISE
// SCRIPT.JS - PART 1
// Navigation + Music + Gallery
// =====================================

// ---------- Pages ----------
const sections = document.querySelectorAll("section");

function showPage(index) {
    sections.forEach((section, i) => {
        section.classList.toggle("hidden", i !== index);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Start Home Page
showPage(0);

// ---------- Navigation ----------
document.getElementById("openBtn").onclick = () => showPage(1);
document.getElementById("next1").onclick = () => showPage(2);
document.getElementById("next2").onclick = () => showPage(3);
document.getElementById("next3").onclick = () => showPage(4);
document.getElementById("next4").onclick = () => showPage(5);
document.getElementById("next5").onclick = () => {
    showPage(6);

    if (typeof confetti === "function") {
        confetti();
    }
};

// =====================================
// MUSIC
// =====================================

const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

playBtn.onclick = () => {

    if (song.paused) {

        song.play();

        playBtn.innerHTML = "⏸ Pause Music";

    } else {

        song.pause();

        playBtn.innerHTML = "▶ Play Music";

    }

};

// Auto play after first click
window.addEventListener("click", () => {

    song.play().catch(() => {});

}, { once: true });

// =====================================
// PHOTO GALLERY
// =====================================

const slider = document.getElementById("sliderImage");

const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

let current = 0;

function showImage(index) {

    slider.style.opacity = "0";

    setTimeout(() => {

        slider.src = images[index];

        slider.style.opacity = "1";

    }, 200);

}

// Next Button
document.getElementById("next").onclick = () => {

    current++;

    if (current >= images.length) {
        current = 0;
    }

    showImage(current);

};

// Previous Button
document.getElementById("prev").onclick = () => {

    current--;

    if (current < 0) {
        current = images.length - 1;
    }

    showImage(current);

};

// Auto Slider
setInterval(() => {

    current++;

    if (current >= images.length) {
        current = 0;
    }

    showImage(current);

}, 4000);

// First Image
window.onload = () => {

    showImage(current);

};
