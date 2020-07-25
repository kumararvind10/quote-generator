const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQouteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//show loading
function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get Qoute from  Api
async function getQoute() {
    showloadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        let response = await fetch(proxyUrl + apiUrl);
        let data = await response.json();
        // if author is blank add 'Unknown'
        (data.quoteAuthor === '') ? authorText.innerText = 'Unknown' : authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;

        //Reduce font size for long quote
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        removeLoadingSpinner();
    } catch (error) {
        console.log('oops something went wrong', error);
    }
}

//tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl);
}

//event listner
newQouteBtn.addEventListener('click', getQoute);
twitterBtn.addEventListener('click', tweetQuote);

getQoute();