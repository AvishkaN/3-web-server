console.log("client side js loaded");

const wetherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

wetherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "loading...";

  fetch(`http://localhost:3000/weather?address=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        // console.log(data.error);

        // messageOne.style.color = "red";
        messageOne.textContent = "";
        messageTwo.textContent = data.error;
      } else {
        // console.log(data.location);
        // console.log(data.forecast);

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
});
