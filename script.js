// ===============================
// PAGES
// ===============================

const sections = document.querySelectorAll("section");

function showPage(index) {
    sections.forEach((section, i) => {
        section.classList.toggle("hidden", i !== index);
    });
}

showPage(0);

// ===============================
// BUTTONS
// ===============================

document.getElementById("openBtn").onclick = () => showPage(1);
document.getElementById("next1").onclick = () => showPage(2);

document.getElementById("next2").onclick = () => {
    showPage(3);

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();
    }, 100);
};

document.getElementById("next3").onclick = () => showPage(4);
document.getElementById("next4").onclick = () => showPage(5);

document.getElementById("next5").onclick = () => {
    showPage(6);
    confetti();
};

// ===============================
// MUSIC PLAYER
// ===============================

const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

playBtn.addEventListener("click", () => {

    if (song.paused) {

        song.play();

        playBtn.innerHTML = "⏸ Pause";

    } else {

        song.pause();

        playBtn.innerHTML = "▶ Play";

    }

});

// ===============================
// GALLERY
// ===============================

const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

let current = 0;

const slider = document.getElementById("sliderImage");

document.getElementById("next").onclick = () => {

    current++;

    if (current >= images.length)
        current = 0;

    slider.src = images[current];

};

document.getElementById("prev").onclick = () => {

    current--;

    if (current < 0)
        current = images.length - 1;

    slider.src = images[current];

};

// Auto Gallery

setInterval(() => {

    current++;

    if (current >= images.length)
        current = 0;

    slider.src = images[current];

}, 4000);
// ===============================
// PREMIUM SPIN WHEEL
// ===============================

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const reasons = [
    "Your Smile 😊",
    "My Safe Place 🏡",
    "My Happiness 💜",
    "My Forever ❤️",
    "My Best Friend 🌸",
    "My Everything 👑"
];

const colors = [
    "#ffb3d9",
    "#d9b3ff",
    "#b3e5ff",
    "#ffe0b3",
    "#c8f7c5",
    "#f7c5ff"
];

function drawWheel() {

    const angle = (Math.PI * 2) / reasons.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < reasons.length; i++) {

        ctx.beginPath();
        ctx.moveTo(160, 160);

        ctx.arc(
            160,
            160,
            150,
            angle * i,
            angle * (i + 1)
        );

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();

        ctx.translate(160, 160);
        ctx.rotate(angle * i + angle / 2);

        ctx.fillStyle = "#333";
        ctx.font = "bold 14px Poppins";
        ctx.textAlign = "center";

        ctx.fillText(reasons[i], 90, 5);

        ctx.restore();
    }

    // Center Circle
    ctx.beginPath();
    ctx.arc(160,160,28,0,Math.PI*2);
    ctx.fillStyle="#ffffff";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(160,160,8,0,Math.PI*2);
    ctx.fillStyle="#ff4da6";
    ctx.fill();
}

drawWheel();

let rotation = 0;
let spinning = false;

document.getElementById("spin").onclick = function () {

    if(spinning) return;

    spinning = true;

    const random = Math.floor(Math.random() * reasons.length);

    rotation += 360 * 5 + random * 60;

    canvas.style.transition =
    "transform 5s cubic-bezier(.17,.67,.25,1)";

    canvas.style.transform =
    `rotate(${rotation}deg)`;

    setTimeout(() => {

        document.getElementById("result").innerHTML =
        "❤️ " + reasons[random];

        confetti();

        spinning = false;

    },5000);

};
// ---------- Auto Slider ----------
setInterval(() => {
    current++;
    if (current >= images.length) current = 0;
    slider.src = images[current];
}, 4000);

// ---------- Floating Hearts ----------
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💜";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    heart.style.fontSize = (20 + Math.random() * 25) + "px";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);

}, 500);

// ---------- Auto Play Music ----------
window.addEventListener("click", () => {
    song.play().catch(() => {});
}, { once: true });

// ---------- Button Click Effect ----------
document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.92)";

        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);

    });

});

// ---------- Confetti ----------
function confetti() {

    const colors = [
        "#ff4d6d",
        "#ffb703",
        "#06d6a0",
        "#8ecae6",
        "#b5179e",
        "#7b2cbf"
    ];

    for (let i = 0; i < 120; i++) {

        const c = document.createElement("div");

        c.className = "confetti";

        c.style.left = Math.random() * 100 + "vw";

        c.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        c.style.animationDuration =
            (3 + Math.random() * 2) + "s";

        document.body.appendChild(c);

        setTimeout(() => {
            c.remove();
        }, 5000);
    }
}
