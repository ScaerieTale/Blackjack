// global variables needed for the game to function
var dealerCardSum = 0;
var playerCardSum = 0;
/* Because Aces can be 1 or 11 in Blackjack, it's important
that we keep track of how many both the dealer and player
are holding at any given time within a round. */
var dealerHeldAces = 0;
var playerHeldAces = 0;

// For the Dealer's hidden card
var hidden;

var newDeck; // for the deck(s)

/* playerCanHit means that you're not at 21 or above, and
can draw another card. Default is true */
var playerCanHit = true;

// end of global variables

// Functions

/* A set of functions to build the game deck as soon as the
window finishes loading in the script */
/* cardFaces are the values, e.g. ace, king, 2, 3 etc.
cardTypes are the suit e.g. hearts, spades.
The buildDeck function concatonates the deck array from
the two to create ace_of_clubs through king_of_spades,
corresponding to the image names in /cards/ subfolder */

window.onload = function() {
    buildCardDeck();
    shuffle();
}


function buildCardDeck() {
    let cardFaces = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    let cardTypes = ["clubs", "diamonds", "hearts", "spades"];
    newDeck = [];
    for (let i = 0; i < cardTypes.length; i++) {
        for (let j = 0; j < cardFaces.length; j++) {
            newDeck.push(cardFaces[j] + "_of_" + cardTypes[i]);
        }
    }
}
/* In order to shuffle the deck and get a random card:
Math.random times the length of thedeck array (e.g. 52),
within Math.floor to round dpwn to the nearest integer */
function shuffle() {
    for (i = 0; i < newDeck.length; i++) {
        let j = Math.floor(Math.random() * newDeck.length);
        let temp = newDeck[i];
        newDeck[i] = newDeck[j];
        newDeck[j] = temp;
    }
    console.log(newDeck);
}

