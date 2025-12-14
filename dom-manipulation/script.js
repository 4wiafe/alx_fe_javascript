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
const exportQuotes = document.getElementById("exportFile");
const KEY = "quote";

loadQuote();

showQuoteBtn.addEventListener("click", showRandomQuote);
exportQuotes.addEventListener("click", exportData);

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

  const text = newQuoteText.value.trim();
  const quote = newQuoteCategory.value.trim();

  if (!text || !quote) return;

  quotes.push({text, category});

  saveQuote();

  newQuoteText.value = "";
  newQuoteCategory.value = "";

  showRandomQuote();
}

function addQuote() {
  createAddQuoteForm();
}

function saveQuote() {
  try {
    localStorage.setItem(KEY, JSON.stringify(quotes));
    return true;
  } catch (error) {
    console.error("Failed to save quote.", error.message);
    return false;
  }
}

function loadQuote() {
  const storedQuotes = localStorage.getItem(KEY);

  if (storedQuotes) {
    try {
      quotes = JSON.parse(storedQuotes);
      return true;
     } catch (error) {
       console.error("Failed to load quote", error.message);
       return false;
     }
  }
}

function exportData() {
  const quotesToJSON = JSON.stringify(quotes, null, 2);
  const blob = new Blob([quotesToJSON], { type: "application/json" });
  const downloadLink = URL.createObjectURL(blob);
  const linkElement = document.createElement("a");

  linkElement.href = downloadLink;
  linkElement.download = "quotes.json";
  linkElement.click();

  URL.revokeObjectURL(blob);
}
