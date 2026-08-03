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
