const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const lineBtn = document.getElementById('line');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    //   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    showLoadingSpinner();
    const proxyUrl = 'https://agile-spire-02226.herokuapp.com/';

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, print 'unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown Author'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce fong size for long quote
        if (data.quoteText.length > 25) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
        console.log('whoops, no Quote', error);
    }
}

// Line Quote
function lineQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const lineUrl = `https://maker.ifttt.com/trigger/lineQuote/with/key/bnLgGHzdG1aXob7Z8AYlS4?value1=${quote}&value2=${author}`;
    window.open(lineUrl, '_blank');
}
// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
lineBtn.addEventListener('click', lineQuote);

// On Load
getQuote();
