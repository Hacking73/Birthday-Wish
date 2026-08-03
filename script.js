// ---------- Pages ----------
const sections = document.querySelectorAll("section");

function showPage(index){
    sections.forEach((sec,i)=>{
        sec.classList.toggle("hidden", i !== index);
    });
}

showPage(0);

// ---------- Navigation ----------
document.getElementById("openBtn").onclick = ()=>showPage(1);
document.getElementById("next1").onclick = ()=>showPage(2);
document.getElementById("next2").onclick = ()=>{
    showPage(3);
    setTimeout(drawWheel,100);
};
document.getElementById("next3").onclick = ()=>showPage(4);
document.getElementById("next4").onclick = ()=>showPage(5);
document.getElementById("next5").onclick = ()=>{
    showPage(6);
    confetti();
};

// ---------- Music ----------
const song = document.getElementById("song");
const playBtn = document.getElementById("playMusic");

playBtn.onclick = ()=>{
    if(song.paused){
        song.play();
        playBtn.innerHTML="⏸ Pause";
    }else{
        song.pause();
        playBtn.innerHTML="▶ Play";
    }
};
// ---------- Gallery ----------
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
    if(current >= images.length){
        current = 0;
    }
    slider.src = images[current];
};

document.getElementById("prev").onclick = () => {
    current--;
    if(current < 0){
        current = images.length - 1;
    }
    slider.src = images[current];
};

// Auto Slider
setInterval(() => {
    current++;
    if(current >= images.length){
        current = 0;
    }
    slider.src = images[current];
}, 4000);


// ---------- Spin Wheel ----------
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
    "#ffd6a5",
    "#b8f2e6",
    "#ffc8dd",
    "#cdb4db"
];

function drawWheel(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const angle = (Math.PI*2)/reasons.length;

    for(let i=0;i<reasons.length;i++){

        ctx.beginPath();
        ctx.moveTo(160,160);
        ctx.arc(
            160,
            160,
            150,
            angle*i,
            angle*(i+1)
        );

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();

        ctx.translate(160,160);
        ctx.rotate(angle*i + angle/2);

        ctx.fillStyle="#333";
        ctx.font="bold 15px Poppins";
        ctx.textAlign="center";

        ctx.fillText(reasons[i],90,5);

        ctx.restore();
    }
}

drawWheel();

let rotation = 0;

document.getElementById("spin").onclick = () => {

    const random = Math.floor(Math.random()*reasons.length);

    rotation += 360*5 + random*60;

    canvas.style.transition =
        "transform 5s cubic-bezier(.17,.67,.2,1)";

    canvas.style.transform =
        `rotate(${rotation}deg)`;

    document.getElementById("spin").disabled = true;

    setTimeout(()=>{

        document.getElementById("result").innerHTML =
            "❤️ " + reasons[random];

        document.getElementById("spin").disabled = false;

        confetti();

    },5000);

};
// ---------- Scratch Card ----------
const scratch = document.getElementById("scratchCanvas");
const sctx = scratch.getContext("2d");

scratch.width = 320;
scratch.height = 140;

sctx.fillStyle = "#b784ff";
sctx.fillRect(0,0,scratch.width,scratch.height);

sctx.fillStyle = "#ffffff";
sctx.font = "bold 24px Poppins";
sctx.textAlign = "center";
sctx.fillText("Scratch Here ❤️",160,75);

let scratching = false;

function erase(x,y){
    sctx.globalCompositeOperation = "destination-out";
    sctx.beginPath();
    sctx.arc(x,y,20,0,Math.PI*2);
    sctx.fill();
}

// Desktop
scratch.addEventListener("mousedown",()=>{
    scratching = true;
});

scratch.addEventListener("mouseup",()=>{
    scratching = false;
});

scratch.addEventListener("mouseleave",()=>{
    scratching = false;
});

scratch.addEventListener("mousemove",(e)=>{

    if(!scratching) return;

    const rect = scratch.getBoundingClientRect();

    erase(
        e.clientX - rect.left,
        e.clientY - rect.top
    );

});

// Mobile
scratch.addEventListener("touchstart",()=>{
    scratching = true;
});

scratch.addEventListener("touchend",()=>{
    scratching = false;
});

scratch.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    if(!scratching) return;

    const rect = scratch.getBoundingClientRect();

    erase(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
    );

},{passive:false});


// ---------- Floating Hearts ----------
setInterval(()=>{

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "💜";

    heart.style.left = Math.random()*100 + "%";
    heart.style.fontSize =
        (18 + Math.random()*22) + "px";

    heart.style.animationDuration =
        (4 + Math.random()*3) + "s";

    document.getElementById("hearts")
    .appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },7000);

},500);


// ---------- Confetti ----------
function confetti(){

    const colors = [
        "#ff4d6d",
        "#ffd60a",
        "#06d6a0",
        "#4cc9f0",
        "#b5179e",
        "#8338ec"
    ];

    for(let i=0;i<120;i++){

        const c = document.createElement("div");

        c.className = "confetti";

        c.style.left = Math.random()*100 + "vw";

        c.style.background =
            colors[Math.floor(Math.random()*colors.length)];

        c.style.animationDuration =
            (3 + Math.random()*2) + "s";

        document.body.appendChild(c);

        setTimeout(()=>{
            c.remove();
        },5000);
    }
}


// ---------- Auto Play Music ----------
window.addEventListener("click",()=>{

    song.play().catch(()=>{});

},{once:true});


// ---------- Button Animation ----------
document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.transform = "scale(.92)";

        setTimeout(()=>{
            btn.style.transform = "scale(1)";
        },150);

    });

});


// ---------- Scroll Top ----------
window.scrollTo({
    top:0,
    behavior:"smooth"
});
