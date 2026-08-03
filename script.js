const sections = document.querySelectorAll("section");

function showPage(index) {
    sections.forEach((sec, i) => {
        sec.classList.toggle("hidden", i !== index);
    });
}

showPage(0);

document.getElementById("openBtn").addEventListener("click", () => {
    alert("Working");
    showPage(1);
});
const scratch = document.getElementById("scratchCanvas");
const sctx = scratch.getContext("2d");

function resetScratch() {

    sctx.globalCompositeOperation = "source-over";

    sctx.fillStyle = "#b784ff";
    sctx.fillRect(0,0,scratch.width,scratch.height);

    sctx.fillStyle = "#fff";
    sctx.font = "24px Poppins";
    sctx.textAlign = "center";
    sctx.fillText("Scratch Here ❤️",160,75);

}

resetScratch();

let drawing = false;

scratch.addEventListener("mousedown",()=>drawing=true);
scratch.addEventListener("mouseup",()=>drawing=false);
scratch.addEventListener("mouseleave",()=>drawing=false);

scratch.addEventListener("mousemove",(e)=>{

    if(!drawing) return;

    const rect = scratch.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sctx.globalCompositeOperation = "destination-out";
    sctx.beginPath();
    sctx.arc(x,y,20,0,Math.PI*2);
    sctx.fill();

});
