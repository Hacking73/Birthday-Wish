// =====================================
// BIRTHDAY SURPRISE
// SCRIPT.JS - PART 1
// Navigation + Music + Gallery
// =====================================

// ---------- Sections ----------
const sections = document.querySelectorAll("section");

function showPage(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Home Page
showPage(0);

// ---------- Navigation ----------
document.getElementById("openBtn").addEventListener("click", () => {
    showPage(1);
});

document.getElementById("next1").addEventListener("click", () => {
    showPage(2);
});

document.getElementById("next2").addEventListener("click", () => {
    showPage(3);
});

document.getElementById("next3").addEventListener("click", () => {
    showPage(4);
});

document.getElementById("next4").addEventListener("click", () => {
    showPage(5);
});

document.getElementById("next5").addEventListener("click", () => {
    showPage(6);

    if (typeof confetti === "function") {
        confetti();
    }
});

// =====================================
// MUSIC
// =====================================

const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

playBtn.addEventListener("click", () => {

    if (song.paused) {

        song.play();

        playBtn.textContent = "⏸ Pause Music";

    } else {

        song.pause();

        playBtn.textContent = "▶ Play Music";

    }

});

// Auto Play (Browser Permission)
window.addEventListener("click", () => {

    song.play().catch(() => {});

}, { once: true });

// =====================================
// GALLERY
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

    if (!slider) return;

    slider.style.opacity = "0";

    setTimeout(() => {

        slider.src = images[index];

        slider.style.opacity = "1";

    }, 200);

}

// Next
document.getElementById("next").addEventListener("click", () => {

    current++;

    if (current >= images.length) {
        current = 0;
    }

    showImage(current);

});

// Previous
document.getElementById("prev").addEventListener("click", () => {

    current--;

    if (current < 0) {
        current = images.length - 1;
    }

    showImage(current);

});

// Auto Slider
setInterval(() => {

    current++;

    if (current >= images.length) {
        current = 0;
    }

    showImage(current);

}, 4000);

// Load First Image
window.addEventListener("load", () => {

    showImage(current);

});
// =====================================
// SCRIPT.JS - PART 2
// SPIN WHEEL + SCRATCH CARD
// =====================================

// ---------- Spin Wheel ----------

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const reasons = [
    "Your Smile 😊",
    "My Happiness ❤️",
    "My Safe Place 🏡",
    "My Best Friend 🌸",
    "My Forever 💖",
    "My Everything 👑"
];

const colors = [
    "#ffd6ec",
    "#d9b8ff",
    "#ffc8dd",
    "#cdb4db",
    "#bde0fe",
    "#ffcfd2"
];

let rotation = 0;

function drawWheel() {

    const arc = (Math.PI * 2) / reasons.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < reasons.length; i++) {

        ctx.beginPath();
        ctx.moveTo(160, 160);

        ctx.arc(
            160,
            160,
            150,
            i * arc,
            (i + 1) * arc
        );

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();

        ctx.translate(160, 160);
        ctx.rotate(i * arc + arc / 2);

        ctx.fillStyle = "#333";
        ctx.font = "16px Poppins";
        ctx.textAlign = "center";

        ctx.fillText(reasons[i], 95, 5);

        ctx.restore();
    }
}

drawWheel();

const spinBtn = document.getElementById("spin");

spinBtn.addEventListener("click", () => {

    const random = Math.floor(Math.random() * reasons.length);

    rotation += 1800 + random * 60;

    canvas.style.transform = `rotate(${rotation}deg)`;

    spinBtn.disabled = true;

    setTimeout(() => {

        document.getElementById("result").innerHTML =
            "❤️ " + reasons[random];

        spinBtn.disabled = false;

        if (typeof confetti === "function") {
            confetti();
        }

    }, 5000);

});

// =====================================
// SCRATCH CARD
// =====================================

const scratch = document.getElementById("scratchCanvas");
const sctx = scratch.getContext("2d");

scratch.width = 320;
scratch.height = 140;

function resetScratch() {

    sctx.globalCompositeOperation = "source-over";

    sctx.fillStyle = "#b784ff";
    sctx.fillRect(0, 0, scratch.width, scratch.height);

    sctx.fillStyle = "#ffffff";
    sctx.font = "bold 24px Poppins";
    sctx.textAlign = "center";

    sctx.fillText(
        "Scratch Here ❤️",
        scratch.width / 2,
        75
    );

}

resetScratch();

let scratching = false;

function scratchMove(x, y) {

    sctx.globalCompositeOperation = "destination-out";

    sctx.beginPath();
    sctx.arc(x, y, 22, 0, Math.PI * 2);
    sctx.fill();

}

// Mouse

scratch.addEventListener("mousedown", () => scratching = true);

scratch.addEventListener("mouseup", () => scratching = false);

scratch.addEventListener("mouseleave", () => scratching = false);

scratch.addEventListener("mousemove", (e) => {

    if (!scratching) return;

    const rect = scratch.getBoundingClientRect();

    scratchMove(
        e.clientX - rect.left,
        e.clientY - rect.top
    );

});

// Touch

scratch.addEventListener("touchstart", () => {

    scratching = true;

});

scratch.addEventListener("touchend", () => {

    scratching = false;

});

scratch.addEventListener("touchmove", (e) => {

    if (!scratching) return;

    e.preventDefault();

    const rect = scratch.getBoundingClientRect();

    scratchMove(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
    );

}, {
    passive: false
});
