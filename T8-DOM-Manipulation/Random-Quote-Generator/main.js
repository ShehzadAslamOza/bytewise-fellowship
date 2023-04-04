// Variables
let quote = document.querySelector(".quote");
let person = document.querySelector(".person");
let newQuoteBtn = document.querySelector("#new-quote");

// Data

const quotes = [
  {
    quote: "The only sin is ignorance",
    person: "Christopher Marlowe",
  },
  {
    quote:
      "A man is his own easiest dupe, for what he wishes to be true he generally believes to be true",
    person: "Demosthenes",
  },
  {
    quote:
      "A lie can travel halfway around the world while the truth is putting on its shoes",
    person: "Mark Twain",
  },
  {
    quote:
      "Great minds discuss ideas; average minds discuss events; small minds discuss people",
    person: "Eleanor Roosevelt",
  },
  {
    quote: "If you have a garden and a library, you have everything you need",
    person: "Marcus Tullius Cicero",
  },
  {
    quote: "Truth comes out in wine",
    person: "Pliny the Elder",
  },
  {
    quote: "Everything in the universe is within you. Ask all from yourself",
    person: "Rumi",
  },
  {
    quote:
      "When I get a little money I buy books; and if any is left I buy food and clothes",
    person: "Desiderius Erasmus",
  },
];

// To avoid duplicate
let previousRandom = 0;

// Button Click
newQuoteBtn.addEventListener("click", () => {
  let random = Math.floor(Math.random() * quotes.length);

  if (random == previousRandom) {
    if (random != 0) {
      random--;
    }
  }

  previousRandom = random;

  quote.textContent = '"' + quotes[random].quote + '"';
  person.textContent = quotes[random].person;
  console.log(random);
});
