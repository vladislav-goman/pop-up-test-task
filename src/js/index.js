import data from "../data/xbox.json";
import checkMarkIcon from "../assets/check.svg";
import crossIcon from "../assets/negative.svg";
import XBOXWhite from "../assets/xbox-1-s.jpg";
import XBOXSilver from "../assets/xbox-silver.jpg";
import XBOXBlack from "../assets/xbox-black.jpg";

const COLORS_MAP = {
  59: XBOXWhite,
  60: XBOXBlack,
  61: XBOXSilver,
};

const AVAILABLE_STATUS = "Produkt dostępny";

const productArea = document.querySelector("#product-list");
const modalWindow = document.querySelector("#modal-product");
const closeButton = document.querySelector("#close-modal");
const bodyTag = document.querySelector("body");
const sizeArea = document.querySelector("#label-area");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const colorSelect = document.querySelector("#select-color");
const isProductAvailable = document.querySelector("#product-available");
const quantityInputArea = document.querySelector("#quantityInputArea");
const quantityInput = document.querySelector("#quantityInput");
const productImage = document.querySelector("#product-image");

const createColorSelectItem = ({ name, id }) =>
  `<option value="${id}">${name}</option>`;

const createSizeItem = ({ name, type, price, amount, status }) =>
  `
  <label role="button" tabindex="0" data-status="${status}" data-price="${price}" data-amount="${amount}" for="${type}" class="size__item">${name}</label>
  <input
    class="size__input"
    type="radio"
    name="ram"
    value="${type}"
    id="${type}"
    required
  />
`;

const getStatusHTML = (status) =>
  status === AVAILABLE_STATUS
    ? `
        <img src="${checkMarkIcon}" alt="Check mark" />
        <p>${status}</p>
      `
    : `
        <img src="${crossIcon}" alt="Check mark" />
        <p>${status}</p>
      `;

const openModal = ({ target }) => {
  if (target.tagName === "BUTTON") {
    const { product, sizes, multiversions } = data;
    const colorItems = Object.values(multiversions[0].items).map(
      ({ values, values_id }) => values[values_id]
    );
    const sizeItems = Object.values(sizes.items);
    productPrice.innerHTML = `${sizeItems[0].price} zł`;
    productName.innerHTML = product.name;
    colorSelect.innerHTML = colorItems.reduce(
      (acc, curr) => acc + createColorSelectItem(curr),
      ""
    );
    sizeArea.innerHTML = sizeItems.reduce(
      (acc, curr) => acc + createSizeItem(curr),
      ""
    );
    productImage.src = COLORS_MAP[colorItems[0].id];
    modalWindow.classList.add("active");
    bodyTag.classList.add("modal-open");
  }
};

const closeModal = (event) => {
  event.preventDefault();
  modalWindow.classList.remove("active");
  bodyTag.classList.remove("modal-open");
};

productArea.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

modalWindow.addEventListener("click", (event) => {
  if (event.target.id === "modal-product") {
    closeModal(event);
  }
});

sizeArea.addEventListener("click", ({ target }) => {
  if (target.tagName === "LABEL") {
    const stockAmount = target.dataset.amount;
    productPrice.innerHTML = `${target.dataset.price} zł`;
    if (!parseInt(stockAmount)) {
      quantityInput.value = 0;
    }
    quantityInput.max = stockAmount;
    isProductAvailable.innerHTML = getStatusHTML(target.dataset.status);
    sizeArea.querySelectorAll(".size__item").forEach((label) => {
      label.classList.remove("active");
    });
    target.classList.toggle("active");
  }
});

quantityInputArea.addEventListener("click", ({ target }) => {
  if (target.classList.contains("plus") || target.id === "plus") {
    quantityInput.stepUp(1);
  } else if (target.classList.contains("minus") || target.id === "minus") {
    quantityInput.stepDown(1);
  }
});

colorSelect.addEventListener("change", ({ target }) => {
  productImage.src = COLORS_MAP[target.value];
});
