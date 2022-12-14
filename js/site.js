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
    displayLoanGrid(loanObj);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a positive interger value",
    });
  }
}

// creates the loan object
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
    `$${totalPrincipal.toLocaleString()}`;

  let totalMonthlyPay = totalMonthly(loanObj).toFixed(2);
  document.getElementById("monthlyPayment").innerHTML =
    `$${totalMonthlyPay.toLocaleString()}`;

  let totalInterestPay = totalInterest(loanObj).toFixed(2);
  document.getElementById("interest").innerHTML =
    `$${totalInterestPay.toLocaleString()}`;

  let totalCostPay = totalCost(loanObj).toFixed(2);
  document.getElementById("cost").innerHTML = `$${totalCostPay.toLocaleString()}`;
}

// sets the asking loan
function totalAmount(loanObj) {
  let totalPrincipal = loanObj.amount;
  return totalPrincipal;
}

// calculates total monthly payments
function totalMonthly(loanObj) {
  let totalPrincipal = loanObj.amount;

  // calculates monthly interest rate
  let monthsToPay = loanObj.terms;
  let interestPerMonth = monthlyInterest(loanObj);

  // calculates monthly payments
  let x = Math.pow(1 + interestPerMonth, monthsToPay);
  let monthly = (totalPrincipal * x * interestPerMonth) / (x - 1);

  // displays monthly payments
  // let monthlyPay = monthly.toFixed(2);

  return monthly;
}

// calculates total interest
function totalInterest(loanObj) {
  let totalInterest = totalMonthly(loanObj) * loanObj.terms - loanObj.amount;

  return totalInterest;
}

// calculates total cost
function totalCost(loanObj) {
  let totalCost = totalMonthly(loanObj) * loanObj.terms;
  return totalCost;
}

// calculates monthly interest
function monthlyInterest(loanObj) {
  let interestPerMonth = loanObj.interest / 100 / 12;
  return interestPerMonth;
}

// displays loan grid to page
function displayLoanGrid(loanObj) {
  // get the template
  const template = document.getElementById("loanData-template");

  // get the location where the template will be written
  const loanBody = document.getElementById("loanBody");
  loanBody.innerHTML = "";
  let rate = loanObj.interest / 1200;
  let remainingBalance = loanObj.amount;
  let interestPayPerMonth = 0;
  let totalMonthlyInterest = 0;

  for (let monthsInc = 1; monthsInc <= loanObj.terms; monthsInc++) {
    const loanRow = document.importNode(template.content, true);

    const loanCols = loanRow.querySelectorAll("td");

    interestPayPerMonth = remainingBalance * rate;
    totalMonthlyInterest += interestPayPerMonth;

    let monthlyPrincipal = totalMonthly(loanObj) - interestPayPerMonth;
    remainingBalance = Math.abs(remainingBalance - monthlyPrincipal);

    loanCols[0].textContent = monthsInc;
    loanCols[1].textContent = `$${totalMonthly(loanObj).toFixed(2)}`;
    loanCols[2].textContent = `$${monthlyPrincipal.toFixed(2)}`;
    loanCols[3].textContent = `$${interestPayPerMonth.toFixed(2)}`;
    loanCols[4].textContent = `$${totalMonthlyInterest.toFixed(2)}`;
    loanCols[5].textContent = `$${remainingBalance.toFixed(2)}`;

    loanBody.appendChild(loanRow);
  }
}
