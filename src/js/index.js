const sizeArea = document.querySelector("#label-area");

sizeArea.addEventListener("click", ({ target }) => {
  if (target.tagName === "LABEL") {
    sizeArea.querySelectorAll(".size__item").forEach((label) => {
      label.classList.remove("active");
    });
    target.classList.toggle("active");
  }
});

const quantityInputArea = document.querySelector("#quantityInputArea");
const quantityInput = document.querySelector("#quantityInput");

quantityInputArea.addEventListener("click", ({ target }) => {
  if (target.classList.contains("plus") || target.id === "plus") {
    quantityInput.stepUp(1);
  } else if (target.classList.contains("minus") || target.id === "minus") {
    quantityInput.stepDown(1);
  }
});

const productArea = document.querySelector("#product-list");
const modalWindow = document.querySelector("#modal-product");
const closeButton = document.querySelector("#close-modal");
const bodyTag = document.querySelector("body");

const openModal = ({target}) => {
  if (target.tagName === "BUTTON") {
    modalWindow.classList.add("active");
    bodyTag.classList.add("modal-open");
  }
}

const closeModal = (event) => {
  event.preventDefault();
  modalWindow.classList.remove("active");
  bodyTag.classList.remove("modal-open");
}

productArea.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

modalWindow.addEventListener("click", (event) => {
  if(event.target.id === 'modal-product') {
    console.log('hi')
    closeModal(event)
  }
});
