// Get references to the HTML elements
const quoteTextElement = document.getElementById('quote-text');
const authorTextElement = document.getElementById('author-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

// API that allows CORS
const API_URL = 'https://api.quotable.io/quotes/random';

/**
 * Fetches a random quote from the API and updates the DOM.
 */
async function getNewQuote() {
    // Show a loading message while fetching
    quoteTextElement.textContent = 'Fetching a new quote...';
    authorTextElement.textContent = '';

    try {
        // Try the CORS-enabled API endpoint
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const quote = Array.isArray(data) ? data[0] : data;

        quoteTextElement.textContent = quote.content;
        authorTextElement.textContent = quote.author;

    } catch (error) {
        // Fall back to local quotes if API fails
        console.error('Fetch error:', error);

        // Use one of the local quotes as a fallback
        const fallbackQuotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
        ];

        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        quoteTextElement.textContent = randomQuote.text;
        authorTextElement.textContent = randomQuote.author;
    }
}

// Add event listener to the button
newQuoteBtn.addEventListener('click', getNewQuote);

// Get an initial quote when the page loads
getNewQuote();
