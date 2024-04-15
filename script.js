const income = document.querySelector("#gross-income");
const extraIncome = document.getElementById("extra-income");
const ageGroup = document.getElementById("age-group");
const deductions = document.getElementById("applicable-deductions");
const results = document.querySelector(".results-input");
const calculate = document.querySelector("#calculate");
const reset = document.querySelector("#reset");
const form = document.querySelector("form");
const grossIncomeError = document.getElementById("gross-income-error");
const extraIncomeError = document.getElementById("extra-income-error");
const ageGroupError = document.getElementById("age-group-error");
const deductionsError = document.getElementById("deductions-error");

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

// Validate input fields
function validateInputs() {
  let isValid = true;
  // Validate gross income
  if (isNaN(income.value) || income.value === "") {
    grossIncomeError.style.display = "inline";
    isValid = false;
  } else {
    grossIncomeError.style.display = "none";
  }
  // Validate extra income
  if (isNaN(extraIncome.value) || extraIncome.value === "") {
    extraIncomeError.style.display = "inline";
    isValid = false;
  } else {
    extraIncomeError.style.display = "none";
  }
  // Validate age group
  if (ageGroup.value === "") {
    ageGroupError.style.display = "inline";
    isValid = false;
  } else {
    ageGroupError.style.display = "none";
  }
  // Validate deductions
  if (isNaN(deductions.value) || deductions.value === "") {
    deductionsError.style.display = "inline";
    isValid = false;
  } else {
    deductionsError.style.display = "none";
  }
  return isValid;
}

// Calculate tax and display modal
function calculateTax() {
  if (validateInputs()) {
    const grossIncome = parseFloat(income.value);
    const extraIncomeValue = parseFloat(extraIncome.value);
    const totalDeductions = parseFloat(deductions.value);
    let overallIncome = grossIncome + extraIncomeValue - totalDeductions;
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
  }
}
