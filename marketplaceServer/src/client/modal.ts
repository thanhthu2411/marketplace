const openBtn = document.getElementById("open-modal-btn") as HTMLButtonElement;
const closeBtn = document.getElementById("close-modal-btn") as HTMLButtonElement;
const modal = document.getElementById("listing-modal") as HTMLDivElement;

openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});


modal.addEventListener("click", (event: MouseEvent) => {
  if (event.target === modal) {
    modal.classList.remove("open");
  }
});

console.log("hello")