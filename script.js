const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const customTipInput = document.querySelector("#custom-tip");
const tipButtons = [...document.querySelectorAll(".tip-button")];
const tipAmountOutput = document.querySelector("#tip-amount");
const totalAmountOutput = document.querySelector("#total-amount");
const resetButton = document.querySelector("#reset");
const errorMessage = document.querySelector(".error-message");
const peopleInputWrap = peopleInput.closest(".input-wrap");

let selectedTip = 0;

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function setResetState() {
  const hasValue =
    billInput.value !== "" ||
    peopleInput.value !== "" ||
    customTipInput.value !== "" ||
    selectedTip !== 0;

  resetButton.disabled = !hasValue;
}

function calculate() {
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);

  if (peopleInput.value !== "" && people === 0) {
    errorMessage.textContent = "Can't be zero";
    peopleInputWrap.classList.add("invalid");
  } else {
    errorMessage.textContent = "";
    peopleInputWrap.classList.remove("invalid");
  }

  if (bill > 0 && people > 0 && selectedTip >= 0) {
    const tipAmount = (bill * selectedTip) / 100 / people;
    const totalAmount = (bill + bill * selectedTip / 100) / people;

    tipAmountOutput.textContent = formatCurrency(tipAmount);
    totalAmountOutput.textContent = formatCurrency(totalAmount);
  } else {
    tipAmountOutput.textContent = "$0.00";
    totalAmountOutput.textContent = "$0.00";
  }

  setResetState();
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((tipButton) => tipButton.classList.remove("active"));
    button.classList.add("active");
    selectedTip = Number(button.dataset.tip);
    customTipInput.value = "";
    calculate();
  });
});

customTipInput.addEventListener("input", () => {
  tipButtons.forEach((button) => button.classList.remove("active"));
  selectedTip = Number(customTipInput.value);
  calculate();
});

[billInput, peopleInput].forEach((input) => {
  input.addEventListener("input", calculate);
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  selectedTip = 0;
  tipButtons.forEach((button) => button.classList.remove("active"));
  errorMessage.textContent = "";
  peopleInputWrap.classList.remove("invalid");
  tipAmountOutput.textContent = "$0.00";
  totalAmountOutput.textContent = "$0.00";
  setResetState();
  billInput.focus();
});