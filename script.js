// =====================================
// SCRIPT.JS - PART 1
// Navigation + Music + Gallery
// =====================================

// ---------- Sections ----------
const sections = document.querySelectorAll("section");

// ---------- Show Page ----------
function showPage(index) {
    sections.forEach((section, i) => {
        section.classList.toggle("hidden", i !== index);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Show Home Page
showPage(0);

// =====================================
// NAVIGATION
// =====================================

document.getElementById("openBtn")?.addEventListener("click", () => showPage(1));
document.getElementById("next1")?.addEventListener("click", () => showPage(2));
document.getElementById("next2")?.addEventListener("click", () => showPage(3));
document.getElementById("next3")?.addEventListener("click", () => showPage(4));
document.getElementById("next4")?.addEventListener("click", () => showPage(5));
document.getElementById("next5")?.addEventListener("click", () => {
    showPage(6);

    if (typeof confetti === "function") {
        confetti();
    }
});

// =====================================
// MUSIC PLAYER
// =====================================

const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

if (song && playBtn) {

    playBtn.addEventListener("click", () => {

        if (song.paused) {

            song.play().catch(() => {});
            playBtn.textContent = "⏸ Pause Music";

        } else {

            song.pause();
            playBtn.textContent = "▶ Play Music";

        }

    });

    document.addEventListener("click", () => {
        song.play().catch(() => {});
    }, { once: true });

}

// =====================================
// PHOTO GALLERY
// =====================================

const sliderImage = document.getElementById("sliderImage");

const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

let current = 0;

function showImage(index) {

    if (!sliderImage) return;

    sliderImage.style.opacity = "0";

    setTimeout(() => {

        sliderImage.src = images[index];
        sliderImage.style.opacity = "1";

    }, 200);
}

// Next Image
document.getElementById("next")?.addEventListener("click", () => {

    current++;

    if (current >= images.length) current = 0;

    showImage(current);

});

// Previous Image
document.getElementById("prev")?.addEventListener("click", () => {

    current--;

    if (current < 0) current = images.length - 1;

    showImage(current);

});

// Auto Slider
setInterval(() => {

    current++;

    if (current >= images.length) current = 0;

    showImage(current);

}, 4000);

// First Image
window.addEventListener("load", () => {
    showImage(current);
});
// =====================================
// SCRIPT.JS - PART 2
// Spin Wheel + Scratch Card
// =====================================

// ---------- Spin Wheel ----------

const canvas = document.getElementById("wheelCanvas");

if (canvas) {

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
        "#FFD6EC",
        "#D9B8FF",
        "#FFC8DD",
        "#CDB4DB",
        "#BDE0FE",
        "#FFCFD2"
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
            ctx.font = "bold 16px Poppins";
            ctx.textAlign = "center";

            ctx.fillText(reasons[i], 95, 5);

            ctx.restore();
        }

    }

    drawWheel();

    document.getElementById("spin")?.addEventListener("click", () => {

        const random = Math.floor(Math.random() * reasons.length);

        rotation += 1800 + random * 60;

        canvas.style.transform = `rotate(${rotation}deg)`;

        const spinBtn = document.getElementById("spin");

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

}

// =====================================
// SCRATCH CARD
// =====================================

const scratch = document.getElementById("scratchCanvas");
const sctx = scratch.getContext("2d");

function resetScratch(){

    sctx.globalCompositeOperation = "source-over";

    sctx.fillStyle = "#b784ff";
    sctx.fillRect(0,0,scratch.width,scratch.height);

    sctx.fillStyle = "#ffffff";
    sctx.font = "bold 24px Poppins";
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";

    sctx.fillText(
        "Scratch Here ❤️",
        scratch.width/2,
        scratch.height/2
    );

}

resetScratch();

let scratching = false;

function scratchMove(x,y){

    sctx.globalCompositeOperation="destination-out";

    sctx.beginPath();
    sctx.arc(x,y,20,0,Math.PI*2);
    sctx.fill();

}

scratch.addEventListener("mousedown",()=>scratching=true);
scratch.addEventListener("mouseup",()=>scratching=false);
scratch.addEventListener("mouseleave",()=>scratching=false);

scratch.addEventListener("mousemove",(e)=>{

    if(!scratching) return;

    const rect=scratch.getBoundingClientRect();

    scratchMove(
        e.clientX-rect.left,
        e.clientY-rect.top
    );

});

scratch.addEventListener("touchstart",()=>scratching=true);

scratch.addEventListener("touchend",()=>scratching=false);

scratch.addEventListener("touchmove",(e)=>{

    if(!scratching) return;

    e.preventDefault();

    const rect=scratch.getBoundingClientRect();

    scratchMove(
        e.touches[0].clientX-rect.left,
        e.touches[0].clientY-rect.top
    );

},{passive:false});

// =====================================
// BUTTON CLICK EFFECT
// =====================================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.95)";

        setTimeout(() => {
            button.style.transform = "";
        }, 150);

    });

});

// =====================================
// CONFETTI
// =====================================

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
        piece.style.top = "-20px";
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

// =====================================
// KEYBOARD SUPPORT (Gallery)
// =====================================

document.addEventListener("keydown", (e) => {

    if (sections.length < 3) return;

    if (sections[2].classList.contains("hidden")) return;

    if (e.key === "ArrowRight") {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        showImage(current);

    }

    if (e.key === "ArrowLeft") {

        current--;

        if (current < 0) {
            current = images.length - 1;
        }

        showImage(current);

    }

});

// =====================================
// PAGE LOAD
// =====================================

window.addEventListener("load", () => {

    if (typeof showImage === "function") {
        showImage(current);
    }

    console.log("❤️ Girlfriend's Day Surprise Loaded Successfully ❤️");

});
