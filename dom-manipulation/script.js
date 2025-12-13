const quotes = [
  {
    text: "Small progress is still progress.",
    category: "Motivation",
  },
  {
    text: "First, make it work. Then make it right. Then make it fast.",
    category: "Programming",
  },
  {
    text: "Winners focus on progress, not perfection.",
    category: "Success",
  },
  {
    text: "Self-control is freedom.",
    category: "Discipline",
  },
  {
    text: "Peace begins when expectations end.",
    category: "Life",
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    category: "Philosophy",
  }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

showQuoteBtn.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  quoteDisplay.innerHTML = "";

  const random = Math.floor(Math.random() * quotes.length);

  const text = quotes[random].text;
  const category = quotes[random].category;
  
  const randomQuote = document.createElement("p");
  randomQuote.textContent = `${category}: ${text}`;

  quoteDisplay.appendChild(randomQuote);
}

function createAddQuoteForm() {
  quoteDisplay.innerHTML = "";

  const quoteValue = newQuoteText.value.trim();
  const categoryValue = newQuoteCategory.value.trim();

  quotes.push({
    text: quoteValue,
    category: categoryValue
  });

  newQuoteText.value = "";
  newQuoteCategory.value = "";

  const randomQuote = document.createElement("p");
  randomQuote.textContent = `${categoryValue}: ${quoteValue}`;

  quoteDisplay.appendChild(randomQuote);
}

function addQuote() {
  createAddQuoteForm();
}
