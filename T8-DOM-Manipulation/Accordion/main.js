const accordions = document.getElementsByClassName("content-container");
// console.log(accordions);

for (let i = 0; i < accordions.length; i++) {
  console.log(accordions[i]);
  accordions[i].addEventListener("click", () => {
    accordions[i].classList.toggle("active");
  });
}
