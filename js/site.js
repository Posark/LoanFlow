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
    return  Swal.fire({
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
    interest: loanInterest,
    terms: loanTerms,
  };
  return loanObj;
}

function displayLoanTotal(loanObj) {
  // displays total principal
  let totatPrincipal = loanObj.amount;
  document.getElementById("principal").innerHTML =
    totatPrincipal.toLocaleString();

  // calculates monthly interest rate
  let calculatedPay = loanObj.terms;
  let calculatedInterest = loanObj.interest / 100 / 12;

  // calculates monthly payments
  let x = Math.pow(1 + calculatedInterest, calculatedPay);
  let monthly = (totatPrincipal * x * calculatedInterest) / (x - 1);

  // displays monthly payments
  let monthlyPay = monthly.toFixed(2);
  document.getElementById("monthlyPayment").innerHTML = "$" + monthlyPay;

  // displays total interest
  let totalInterest = (monthly * calculatedPay - totatPrincipal).toFixed(2);
  document.getElementById("interest").innerHTML =
    "$" + totalInterest.toLocaleString();

  // displays total cost
  let totalCost = monthly * calculatedPay;
  document.getElementById("cost").innerHTML = "$" + totalCost.toLocaleString();
}