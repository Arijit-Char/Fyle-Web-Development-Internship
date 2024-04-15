// Selecting elements
const income = document.getElementById("gross-income");
const extraIncome = document.getElementById("extra-income");
const ageGroup = document.getElementById("age-group");
const deductions = document.getElementById("applicable-deductions");
const results = document.querySelector(".results-input");
const calculate = document.getElementById("calculate");
const reset = document.getElementById("reset");
const form = document.querySelector("form");
const grossIncomeError = document.getElementById("gross-income-error");
const extraIncomeError = document.getElementById("extra-income-error");
const ageGroupError = document.getElementById("age-group-error");
const deductionsError = document.getElementById("deductions-error");
const miniDisplay = document.querySelector(".mini-display");
const miniDisplayClose = document.querySelector(".mini-display-close");
const miniDisplayValue = document.querySelector(".mini-display-value");

// Hide error icons by default
const errorIcons = document.querySelectorAll('.error-icon');
errorIcons.forEach(icon => icon.style.display = 'none');

// Reset page
reset.addEventListener("click", () => {
  setTimeout(() => {
    document.location.reload();
  });
});

// Calculate button
calculate.addEventListener("click", (e) => {
  e.preventDefault();
  calculateTax();
});

// Function to validate inputs
function validateInputs() {
  let isValid = true;
  // Validate gross income
  if (!income.value.trim() || isNaN(income.value)) {
    displayError(grossIncomeError);
    isValid = false;
  } else {
    hideError(grossIncomeError);
  }
  // Validate extra income
  if (!extraIncome.value.trim() || isNaN(extraIncome.value)) {
    displayError(extraIncomeError);
    isValid = false;
  } else {
    hideError(extraIncomeError);
  }
  // Validate age group
  if (ageGroup.value === "") {
    displayError(ageGroupError);
    isValid = false;
  } else {
    hideError(ageGroupError);
  }
  // Validate deductions
  if (!deductions.value.trim() || isNaN(deductions.value)) {
    displayError(deductionsError);
    isValid = false;
  } else {
    hideError(deductionsError);
  }
  return isValid;
}

// Function to display error
function displayError(errorElement) {
  errorElement.style.display = "inline";
}

// Function to hide error
function hideError(errorElement) {
  errorElement.style.display = "none";
}

// Calculate tax and display result
function calculateTax() {
  if (validateInputs()) {
    const grossIncomeValue = parseFloat(income.value);
    const extraIncomeValue = parseFloat(extraIncome.value);
    const deductionsValue = parseFloat(deductions.value);
    const overallIncome = grossIncomeValue + extraIncomeValue - deductionsValue;
    let tax = 0;
    if (overallIncome > 800000) {
      const ageGroupValue = ageGroup.value;
      switch (ageGroupValue) {
        case "<40":
          tax = 0.3 * (overallIncome - 800000);
          break;
        case "≥40 & <60":
          tax = 0.4 * (overallIncome - 800000);
          break;
        case "≥60":
          tax = 0.1 * (overallIncome - 800000);
          break;
      }
    }
    results.value = tax > 0 ? tax.toFixed(2) : "No tax";
    miniDisplayValue.textContent =results.value;
    miniDisplay.style.display = "block";
  }
}

// Close mini display
miniDisplayClose.addEventListener("click", () => {
  miniDisplay.style.display = "none";
  document.location.reload();
});

