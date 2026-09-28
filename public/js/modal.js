"use strict";
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.getElementById("close-modal-btn");
const modal = document.getElementById("listing-modal");
openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});
closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("open");
    }
});
console.log("hello");
