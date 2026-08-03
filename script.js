// =====================================
// SCRIPT.JS - PART 1
// Navigation + Music + Gallery
// =====================================

// ---------- Sections ----------
const sections = document.querySelectorAll("section");

// ---------- Show Page ----------
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

// First Page
showPage(0);

// ---------- Navigation ----------
const openBtn = document.getElementById("openBtn");
const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const next3 = document.getElementById("next3");
const next4 = document.getElementById("next4");
const next5 = document.getElementById("next5");

if (openBtn) {
    openBtn.addEventListener("click", () => showPage(1));
}

if (next1) {
    next1.addEventListener("click", () => showPage(2));
}

if (next2) {
    next2.addEventListener("click", () => showPage(3));
}

if (next3) {
    next3.addEventListener("click", () => showPage(4));
}

if (next4) {
    next4.addEventListener("click", () => showPage(5));
}

if (next5) {
    next5.addEventListener("click", () => {
        showPage(6);

        if (typeof confetti === "function") {
            confetti();
        }
    });
}

// =====================================
// MUSIC
// =====================================

const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

if (playBtn && song) {

    playBtn.addEventListener("click", () => {

        if (song.paused) {

            song.play().catch(() => {});

            playBtn.innerHTML = "⏸ Pause Music";

        } else {

            song.pause();

            playBtn.innerHTML = "▶ Play Music";

        }

    });

    // Browser autoplay after first click
    document.addEventListener("click", () => {
        song.play().catch(() => {});
    }, { once: true });

}

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

    if (!slider) return;

    slider.style.opacity = "0";

    setTimeout(() => {

        slider.src = images[index];

        slider.style.opacity = "1";

    }, 200);

}

// Next Image
const nextBtn = document.getElementById("next");

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        showImage(current);

    });

}

// Previous Image
const prevBtn = document.getElementById("prev");

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        current--;

        if (current < 0) {
            current = images.length - 1;
        }

        showImage(current);

    });

}

// Auto Slider
if (slider) {

    setInterval(() => {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        showImage(current);

    }, 4000);

}

// Load First Image
window.addEventListener("load", () => {

    if (slider) {
        showImage(current);
    }

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
            ctx.moveTo(160,160);

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

            ctx.translate(160,160);
            ctx.rotate(i * arc + arc / 2);

            ctx.fillStyle = "#333";
            ctx.font = "bold 16px Poppins";
            ctx.textAlign = "center";

            ctx.fillText(reasons[i],95,5);

            ctx.restore();
        }
    }

    drawWheel();

    const spinBtn = document.getElementById("spin");

    if (spinBtn) {

        spinBtn.addEventListener("click", () => {

            const random = Math.floor(Math.random() * reasons.length);

            rotation += 1800 + random * 60;

            canvas.style.transform =
                `rotate(${rotation}deg)`;

            spinBtn.disabled = true;

            setTimeout(() => {

                const result =
                    document.getElementById("result");

                if (result) {
                    result.innerHTML =
                        "❤️ " + reasons[random];
                }

                spinBtn.disabled = false;

                if (typeof confetti === "function") {
                    confetti();
                }

            },5000);

        });

    }

}

// =====================================
// SCRATCH CARD
// =====================================

const scratch = document.getElementById("scratchCanvas");

if (scratch) {

    const sctx = scratch.getContext("2d");

    scratch.width = 320;
    scratch.height = 140;

    function resetScratch(){

        sctx.globalCompositeOperation =
            "source-over";

        sctx.fillStyle = "#b784ff";
        sctx.fillRect(
            0,
            0,
            scratch.width,
            scratch.height
        );

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

    function scratchMove(x,y){

        sctx.globalCompositeOperation =
            "destination-out";

        sctx.beginPath();
        sctx.arc(x,y,22,0,Math.PI*2);
        sctx.fill();

    }

    // Mouse

    scratch.addEventListener("mousedown",()=>{
        scratching=true;
    });

    scratch.addEventListener("mouseup",()=>{
        scratching=false;
    });

    scratch.addEventListener("mouseleave",()=>{
        scratching=false;
    });

    scratch.addEventListener("mousemove",(e)=>{

        if(!scratching) return;

        const rect =
            scratch.getBoundingClientRect();

        scratchMove(
            e.clientX - rect.left,
            e.clientY - rect.top
        );

    });

    // Touch

    scratch.addEventListener("touchstart",()=>{
        scratching=true;
    });

    scratch.addEventListener("touchend",()=>{
        scratching=false;
    });

    scratch.addEventListener("touchmove",(e)=>{

        if(!scratching) return;

        e.preventDefault();

        const rect =
            scratch.getBoundingClientRect();

        scratchMove(
            e.touches[0].clientX - rect.left,
            e.touches[0].clientY - rect.top
        );

    },{passive:false});

}
// =====================================
// SCRIPT.JS - PART 3
// Floating Hearts + Confetti + Final
// =====================================

// ---------- Floating Hearts ----------

const heartsContainer = document.getElementById("hearts");

if (heartsContainer) {

    setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = "💜";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (18 + Math.random() * 20) + "px";
        heart.style.animationDuration = (4 + Math.random() * 4) + "s";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);

    }, 600);

}

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
// GALLERY KEYBOARD SUPPORT
// =====================================

document.addEventListener("keydown", (e) => {

    if (!sections || sections.length < 3) return;

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

    console.log("❤️ Birthday Surprise Loaded Successfully ❤️");

});
