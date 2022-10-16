// get the user values
function getValues() {
  let loanAmount = document.getElementById("loanAmount").value;

  let loanTerms = document.getElementById("loanTerms").value;

  let loanInterest = document.getElementById("loanInterest").value;

  // parsing the values into integers and loan interest into a percentage
  loanAmount = parseInt(loanAmount);
  loanTerms = parseInt(loanTerms);
  loanInterest = parseInt(loanInterest);

  // maximum value validation
  if (loanAmount > 100000000 || loanTerms > 900 || loanInterest > 1000) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a lower interger",
    });
  }
  // interger validation for values
  else if (
    Number.isInteger(loanAmount) &&
    Number.isInteger(loanTerms) &&
    Number.isInteger(loanInterest)
  ) {
    // puts loan variables into object
    let loanObj = generateLoanObj(loanAmount, loanTerms, loanInterest);

    // displays loan total to page
    displayLoanTotal(loanObj);
    // displays loan grid
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a positive interger value",
    });
  }
}

function generateLoanObj(loanAmount, loanTerms, loanInterest) {
  let loanObj = {
    amount: loanAmount,
    terms: loanTerms,
    interest: loanInterest,
  };
  return loanObj;
}

// displays loan total
function displayLoanTotal(loanObj) {
  // displays total principal
  let totalPrincipal = totalAmount(loanObj);
  document.getElementById("principal").innerHTML =
    totalPrincipal.toLocaleString();

  let totalMonthlyPay = totalMonthly(loanObj);
  document.getElementById("monthlyPayment").innerHTML =
    totalMonthlyPay.toLocaleString();

  let totalInterestPay = totalInterest(loanObj);
  document.getElementById("interest").innerHTML =
    totalInterestPay.toLocaleString();

  let totalCostPay = totalCost(loanObj);
  document.getElementById("cost").innerHTML = totalCostPay.toLocaleString();
}

function totalAmount(loanObj) {
  let totalPrincipal = loanObj.amount;
  return totalPrincipal;
}

function totalMonthly(loanObj) {
  let totalPrincipal = loanObj.amount;

  // calculates monthly interest rate
  let monthsToPay = loanObj.terms;
  let interestPerMonth = loanObj.interest / 100 / 12;

  // calculates monthly payments
  let x = Math.pow(1 + interestPerMonth, monthsToPay);
  let monthly = (totalPrincipal * x * interestPerMonth) / (x - 1);

  // displays monthly payments
  let monthlyPay = monthly.toFixed(2);

  return monthlyPay;
}

function totalInterest(loanObj) {
  let totalInterest = totalMonthly(loanObj) * loanObj.terms - loanObj.amount;

  return totalInterest.toFixed(2);
}

function totalCost(loanObj) {
  let totalCost = totalMonthly(loanObj) * loanObj.terms;
  return totalCost.toFixed(2);
}

// displays loan grid to page
function displayLoanGrid(loanObj) {
  // get the template
  const template = document.getElementById("loanData-template");

  // get the location where the template will be written
  const loanBody = document.getElementById("loanBody");
  loanBody.innerHTML = "";

  for (let i = 0; i = loanObj.terms; i++) {
    const loanRow = document.importNode(template.content, true);

    const loanCols = loanRow.querySelector("td");
  }
}