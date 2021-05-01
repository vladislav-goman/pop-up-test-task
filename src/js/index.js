const sizeArea = document.querySelector("#label-area");

sizeArea.addEventListener("click", ({ target }) => {
  if (target.tagName === "LABEL") {
    sizeArea.querySelectorAll(".size__item").forEach((label) => {
      label.classList.remove("active");
    });
    target.classList.toggle("active");
  }
});
