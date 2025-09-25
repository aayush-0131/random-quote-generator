// Get references to the HTML elements we will be manipulating.
const quoteTextElement = document.getElementById('quote-text');
const authorTextElement = document.getElementById('author-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

// The URL of the free quote API.
const API_URL = 'https://api.quotable.io/random';

/**
 * Fetches a random quote from the API and updates the DOM.
 */
async function getNewQuote() {
    // Show a loading message while fetching.
    quoteTextElement.textContent = 'Fetching a new quote...';
    authorTextElement.textContent = '';

    try {
        // Make an asynchronous call to the API. 'await' pauses the function
        // until the request completes.
        const response = await fetch(API_URL);

        // Check if the request was successful.
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Parse the JSON data from the response.
        const data = await response.json();

        // Update the text content of our HTML elements with the new quote and author.
        quoteTextElement.textContent = data.content;
        authorTextElement.textContent = data.author;

    } catch (error) {
        // If anything goes wrong, log the error and show a user-friendly message.
        console.error('Fetch error:', error);
        quoteTextElement.textContent = 'Sorry, we couldn\'t fetch a quote. Please try again.';
        authorTextElement.textContent = 'Error';
    }
}

// Add a 'click' event listener to the button. When clicked, it will
// call our getNewQuote function.
newQuoteBtn.addEventListener('click', getNewQuote);

// Call the function once when the page first loads to get an initial quote.
getNewQuote();
