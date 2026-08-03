// ===============================
// BIRTHDAY SURPRISE - SCRIPT.JS
// PART 1
// ===============================

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

    setTimeout(() => {
        if (typeof drawWheel === "function") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWheel();
        }
    }, 100);
});

document.getElementById("next3").addEventListener("click", () => {
    showPage(4);
});

document.getElementById("next4").addEventListener("click", () => {
    showPage(5);
});

document.getElementById("next5").addEventListener("click", () => {
    showPage(6);
    confetti();
});

// ===============================
// MUSIC
// ===============================

const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

playBtn.addEventListener("click", () => {

    if (song.paused) {

        song.play();

        playBtn.innerHTML = "⏸ Pause Music";

    } else {

        song.pause();

        playBtn.innerHTML = "▶ Play Music";

    }

});

// Auto play after first click
window.addEventListener("click", () => {

    song.play().catch(() => {});

}, { once: true });

// ===============================
// GALLERY
// ===============================

const slider = document.getElementById("sliderImage");

const images = [

    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"

];

let current = 0;

function showImage(index) {

    slider.src = images[index];

}

// Next image
document.getElementById("next").addEventListener("click", () => {

    current++;

    if (current >= images.length) {

        current = 0;

    }

    showImage(current);

});

// Previous image
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
// ===============================
// PART 2
// SPIN WHEEL
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
    "#f8b4ff",
    "#d5b8ff"
];

function drawWheel() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const angle = (Math.PI * 2) / reasons.length;

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

        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.save();

        ctx.translate(160, 160);
        ctx.rotate(angle * i + angle / 2);

        ctx.fillStyle = "#333";
        ctx.font = "16px Poppins";
        ctx.textAlign = "center";

        ctx.fillText(reasons[i], 95, 5);

        ctx.restore();
    }
}

drawWheel();

let wheelRotation = 0;

document.getElementById("spin").addEventListener("click", () => {

    const random = Math.floor(Math.random() * reasons.length);

    wheelRotation += 1800 + random * 60;

    canvas.style.transition =
        "transform 5s cubic-bezier(.17,.67,.2,1)";

    canvas.style.transform =
        `rotate(${wheelRotation}deg)`;

    document.getElementById("spin").disabled = true;

    setTimeout(() => {

        document.getElementById("result").innerHTML =
            "❤️ " + reasons[random];

        document.getElementById("spin").disabled = false;

        confetti();

    }, 5000);

});

// ===============================
// SCRATCH CARD
// ===============================

const scratch = document.getElementById("scratchCanvas");
const sctx = scratch.getContext("2d");

scratch.width = 320;
scratch.height = 140;

function resetScratch() {

    sctx.globalCompositeOperation = "source-over";

    sctx.fillStyle = "#b784ff";
    sctx.fillRect(0, 0, scratch.width, scratch.height);

    sctx.fillStyle = "#ffffff";
    sctx.font = "24px Poppins";
    sctx.textAlign = "center";

    sctx.fillText(
        "Scratch Here ❤️",
        scratch.width / 2,
        75
    );
}

resetScratch();

let scratching = false;

scratch.addEventListener("mousedown", () => {
    scratching = true;
});

scratch.addEventListener("mouseup", () => {
    scratching = false;
});

scratch.addEventListener("mouseleave", () => {
    scratching = false;
});

scratch.addEventListener("mousemove", (e) => {

    if (!scratching) return;

    const rect = scratch.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sctx.globalCompositeOperation = "destination-out";

    sctx.beginPath();
    sctx.arc(x, y, 18, 0, Math.PI * 2);
    sctx.fill();

});

// Touch Support

scratch.addEventListener("touchmove", (e) => {

    e.preventDefault();

    const rect = scratch.getBoundingClientRect();

    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    sctx.globalCompositeOperation = "destination-out";

    sctx.beginPath();
    sctx.arc(x, y, 22, 0, Math.PI * 2);
    sctx.fill();

}, { passive: false });
// ===============================
// PART 3
// FLOATING HEARTS
// CONFETTI
// BUTTON EFFECTS
// ===============================

// ---------- Floating Hearts ----------

const heartsContainer = document.getElementById("hearts");

setInterval(() => {

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "💜";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (20 + Math.random() * 20) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);

}, 500);

// ===============================
// BUTTON CLICK EFFECT
// ===============================

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.92)";

        setTimeout(() => {

            btn.style.transform = "";

        }, 150);

    });

});

// ===============================
// CONFETTI
// ===============================

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

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (3 + Math.random() * 2) + "s";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);

    }

}

// ===============================
// PAGE LOAD
// ===============================

window.addEventListener("load", () => {

    showImage(current);

    resetScratch();

});

// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener("keydown", (e) => {

    if (!sections[2].classList.contains("hidden")) {

        if (e.key === "ArrowRight") {

            current++;

            if (current >= images.length) current = 0;

            showImage(current);

        }

        if (e.key === "ArrowLeft") {

            current--;

            if (current < 0) current = images.length - 1;

            showImage(current);

        }

    }

});

// ===============================
// END OF SCRIPT
// ===============================

console.log("Birthday Surprise Loaded Successfully ❤️");
