let quotes = [
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
const categoryFilter = document.getElementById("categoryFilter");

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

  quotes.push({text, quote});

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

function importFromJsonFile(event) {
  const file = event.target.files[0];

  if (!file) return;

  const fileReder = new FileReader();

  fileReder.onload = function () {
    try {
      const importedQuotes = JSON.parse(fileReder.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid file format.");
        return;
      }

      importedQuotes.forEach((quote) => {
        if (quote.text && quote.category) {
          quotes.push(quote);
        }
      });

      saveQuote();
      alert("Quotes imported successfully");
    } catch (error) {
      
    }
  };

  fileReder.readAsText(file);
}

function populateCategories() {
  const categories = quotes.map(quote => quote.category);

  const uniqueCategories = [...new Set(categories)];

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.toLowerCase();
    option.textContent = category;
    
    categoryFilter.append(option);
  });
}

populateCategories();
