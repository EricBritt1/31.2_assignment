const base_url = "https://numbersapi.com"

// Number 1: Get a singular fact about one number
function getFactAboutNumber (number) {
    let url = `http://numbersapi.com/${number}/math?json`
    let ourFirstPromise = axios.get(url)
    ourFirstPromise.then(res => {
        console.log(res.data.text)
    })
    ourFirstPromise.catch(err => console.log("REJECTED!!", err))
}

// Number 2: Get multiple facts for multiple numbers. Pass in an array of numbers to receive facts about them.

let FactsAboutNumbers = [];

function getFactsForNums(arr) {
    arr.forEach( (element) => {
       FactsAboutNumbers.push(axios.get(`http://numbersapi.com/${element}/math?json`)) 
    })
Promise.all(FactsAboutNumbers)
.then(FactsArr => (
    FactsArr.forEach( (element) => createFactsH1(element.data.text))
))
    .catch(err => console.log(err));
}

// This is so I can add the facts to the page. Very basic but works.
function createFactsH1 (element) {
    $(`<h1>${element}</h1>`).appendTo('body')
}

// Number 3: Get multiple facts for one number

let FactsForSpecificNumber = [];

function FactsForNumber(number, number_of_facts) {
    for(i = 0; i < number_of_facts + 1; i++) {
        FactsForSpecificNumber.push(axios.get(`http://numbersapi.com/${number}/math?json`)) 
    }
Promise.all(FactsForSpecificNumber)
.then(FactsArr => (
    FactsArr.forEach( (element) => createFactsH1(element.data.text))
))
    .catch(err => console.log(err));
}

// PART 2

// Number 1: Draw a card from a deck (Doesn't have to be same exact deck)

function drawAcard() {
    const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
    let ourPromise = axios.get(url)
    ourPromise.then( res => {
        console.log((res.data.cards[0].value), (res.data.cards[0].suit))
    })
    .catch(err => console.log("REJECTED", err))
}

// Number 2: Make a request to a newly shuffle deck. Then make another request and draw another card to that same exact deck.

function drawOneThenAnother() {
    const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
    let ourPromise = axios.get(url)
    ourPromise.then( res => { 
        console.log((res.data.cards[0].value), (res.data.cards[0].suit), (res.data.deck_id))
    })
    ourPromise.then(res => {
        forSecondCard(res.data.deck_id)
    })
    .catch(err => console.log("REJECTED", err))
}


function forSecondCard (data) {
    const same_deck = `https://deckofcardsapi.com/api/deck/${data}/draw/?count=1`
    let ourPromise2 = axios.get(same_deck)
    ourPromise2.then(res => {
        console.log((res.data.cards[0].value), (res.data.cards[0].suit), (res.data.deck_id))
    })
}

// Number 3: Build an html webpage

const deck_id_container = []

// When on page load we will call this function just to generate a new deck. The decks id that we're going to draw from will be stored in an array.

function createNewDeck() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/"
    let ourPromise = axios.get(url)
    ourPromise.then( res => {
        console.log(res.data.deck_id)
        deck_id_container.push(res.data.deck_id)
    })
    .catch(err => console.log("REJECTED", err))
}

// To draw cards from the deck
function drawFromDeck() {
    url = `https://deckofcardsapi.com/api/deck/${deck_id_container[0]}/draw/?count=1`
    let ourPromise = axios.get(url)
    ourPromise.then(res => {
        console.log(`Value: ${res.data.cards[0].value} Suit: ${res.data.cards[0].suit} deck_id: ${res.data.deck_id} image_address: ${res.data.cards[0].image}`)
    })
    ourPromise.then(res => {
      let div = $('div')  
      let img = $(`<img src = ${res.data.cards[0].image}>`)
      img.appendTo(div)
    })
    .catch(err => console.log("REJECTED", err))
}


// No further study limited on course time at the moment will revisit later.




