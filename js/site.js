function displayMessage() {
  let message = document.getElementById("message").value;

//   alert(msg);

  Swal.fire({
    backdrop: false,
    title: "App Name",
    text: message
  });
}
