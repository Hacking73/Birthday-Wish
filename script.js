// ---------- Pages ----------
const sections = document.querySelectorAll("section");

function showPage(index){
    sections.forEach((sec,i)=>{
        if(i===index){
            sec.classList.remove("hidden");
        }else{
            sec.classList.add("hidden");
        }
    });
}

// Home page
showPage(0);

// ---------- Navigation ----------
document.getElementById("openBtn").onclick=()=>showPage(1);
document.getElementById("next1").onclick=()=>showPage(2);
document.getElementById("next2").onclick = () => {
    showPage(3);

    // Wheel redraw after page opens
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();
    }, 100);
};
document.getElementById("next3").onclick=()=>showPage(4);
document.getElementById("next4").onclick=()=>showPage(5);
document.getElementById("next5").onclick = function () {
    showPage(6);
    confetti();
};
// ---------- Music ----------
const song=document.getElementById("song");
const playBtn=document.getElementById("playMusic");

playBtn.onclick=function(){

if(song.paused){

song.play();

playBtn.innerHTML="⏸ Pause";

}else{

song.pause();

playBtn.innerHTML="▶ Play";

}

}

// ---------- Gallery ----------
const images=[

"images/photo1.jpg",

"images/photo2.jpg",

"images/photo3.jpg",

"images/photo4.jpg"

];

let rotation = 0;

document.getElementById("spin").onclick = function(){

    const random = Math.floor(Math.random()*reasons.length);

    rotation += 360*5 + random*60;

    canvas.style.transition = "transform 5s cubic-bezier(.17,.67,.2,1)";
    canvas.style.transform = `rotate(${rotation}deg)`;

    document.getElementById("spin").disabled = true;

    setTimeout(()=>{

        document.getElementById("result").innerHTML =
        "❤️ " + reasons[random];

        document.getElementById("spin").disabled = false;

        confetti();

    },5000);

}

}

// ---------- Spin Wheel ----------

const canvas=document.getElementById("wheelCanvas");

const ctx=canvas.getContext("2d");

const reasons = [
    "Your Smile 😊",
    "My Safe Place 🏡",
    "My Happiness 💜",
    "My Forever ❤️",
    "My Best Friend 🌸",
    "My Everything 👑"
];

const colors=[

"#f8b4ff",

"#d5b8ff"

];

function drawWheel(){

let angle=(Math.PI*2)/reasons.length;

for(let i=0;i<reasons.length;i++){

ctx.beginPath();

ctx.moveTo(160,160);

ctx.arc(160,160,150,

angle*i,

angle*(i+1));

ctx.fillStyle=colors[i%2];

ctx.fill();

ctx.save();

ctx.translate(160,160);

ctx.rotate(angle*i+angle/2);

ctx.fillStyle="#333";

ctx.font="16px Poppins";

ctx.fillText(reasons[i],60,0);

ctx.restore();

}

}

drawWheel();

let rotation = 0;

document.getElementById("spin").onclick = function () {

    const random = Math.floor(Math.random() * reasons.length);

    rotation += 1800 + (random * 60);

    canvas.style.transform = "rotate(" + rotation + "deg)";

    setTimeout(() => {

        document.getElementById("result").innerHTML =
            "❤️ " + reasons[random];

        confetti();

    }, 5000);

}

// ---------- Scratch Card ----------

const scratch=document.getElementById("scratchCanvas");

const sctx=scratch.getContext("2d");

scratch.width=320;

scratch.height=140;

sctx.fillStyle="#b784ff";

sctx.fillRect(0,0,320,140);

sctx.fillStyle="#fff";

sctx.font="25px Poppins";

sctx.fillText("Scratch Here ❤️",60,75);

let isDown=false;

scratch.addEventListener("mousedown",()=>{

isDown=true;

});

scratch.addEventListener("mouseup",()=>{

isDown=false;

});

scratch.addEventListener("mousemove",function(e){

if(!isDown)return;

const rect=scratch.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

sctx.globalCompositeOperation="destination-out";

sctx.beginPath();

sctx.arc(x,y,18,0,Math.PI*2);

sctx.fill();

});

// Mobile Touch

scratch.addEventListener("touchmove",function(e){

const rect=scratch.getBoundingClientRect();

const x=e.touches[0].clientX-rect.left;

const y=e.touches[0].clientY-rect.top;

sctx.globalCompositeOperation="destination-out";

sctx.beginPath();

sctx.arc(x,y,20,0,Math.PI*2);

sctx.fill();

});

// ---------- Auto Slider ----------

setInterval(function(){

current++;

if(current>=images.length){

current=0;

}

slider.src=images[current];

},4000);
// Floating Hearts

setInterval(function(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="💜";

heart.style.left=Math.random()*100+"%";

heart.style.animationDuration=

(4+Math.random()*4)+"s";

heart.style.fontSize=

20+Math.random()*25+"px";

document.getElementById("hearts").appendChild(heart);

setTimeout(()=>{

heart.remove();

},8000);

},500);


// Auto Play Music

window.addEventListener("click",()=>{

song.play().catch(()=>{});

},{once:true});


// Smooth Scroll Top

window.scrollTo({

top:0,

behavior:"smooth"

});


// Button Click Effect

document.querySelectorAll("button")

.forEach(btn=>{

btn.addEventListener("click",()=>{

btn.style.transform="scale(.92)";

setTimeout(()=>{

btn.style.transform="scale(1)";

},150);

});

});
function confetti(){

const colors=[
"#ff4d6d",
"#ffb703",
"#06d6a0",
"#8ecae6",
"#b5179e",
"#7b2cbf"
];

for(let i=0;i<120;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.background=
colors[Math.floor(Math.random()*colors.length)];

c.style.animationDuration=
(3+Math.random()*2)+"s";

document.body.appendChild(c);

setTimeout(()=>{
c.remove();
},5000);

}

}
