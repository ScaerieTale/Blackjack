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
    gameStart();
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
}


function gameStart() {
    hidden = newDeck.pop();
    dealerCardSum += getValue(hidden);
    dealerHeldAces += checkForAce(hidden);
    
    /* Game loop for Dealer's turn.
    While the loop runs, as long as
    the dealer's hand adds up to < 17
    it gets to draw another card. */
    while (dealerCardSum < 17) {
        let newCardImage = document.createElement("img");
        let newCard = newDeck.pop();
        newCardImage.src = "./cards/" + newCard + ".png";
        dealerCardSum += getValue(newCard);
        dealerHeldAces += checkForAce(newCard);
        document.getElementById("dealerCards").append(newCardImage);

    }
    // Deals the Player's initial hand of 2 cards
    for (i = 0; i < 2; i++) {
        hit();
    }
    // Hit and Stand button logic
    document.getElementById("hit").addEventListener("click", hit);

    document.getElementById("stand").addEventListener("click", stand);
}

// "Hit" button functionality
function hit() {
    if (playerCanHit === false) {
        return;
    }
    let newCardImage = document.createElement("img");
    let newCard = newDeck.pop();
    newCardImage.src = "./cards/" + newCard + ".png";
    playerCardSum += getValue(newCard);
    playerHeldAces += checkForAce(newCard);
    document.getElementById("playerCards").append(newCardImage);

    /* Hit logic.  dropAce means if the total
    is over 21, one ace gets dropped from 11 to 1 */
    if (dropAce(playerCardSum + playerHeldAces) > 21) {
        playerCanHit = false;
    }

}

function dropAce(cardSum, heldAces) {
    while (cardSum > 21 && heldAces > 0) {
        playerCardSum -= 10;
        playerHeldAces -= 1;
        return playerCardSum;
    }
}

/* getValue splits the card into its
constituent parts, for example, Queen
of Hearts becomes an array, [Queen,
Hearts], hence cardIs, as in card
is x of y.  cardIs[0] pulls the
index at 0, or Queen. If it IS a number
We'll just return the integer (int) */

function getValue(card) {
    let cardIs = card.split("_of_");
    let cardValue = cardIs[0];
    
    /* literally "If the value is an Ace, return 11"
    otherwise return 10 because it's a Jack/Queen/King */
    if (isNaN(cardValue)) {
        if (cardValue == "ace") {
            return 11;
        }
        return 10;
    }
    return parseInt(cardValue);
}

/* As the name suggests this function checks for if the card
passed to it is an ace (letter 'a' at index
0 in the string) and returns 1 to add to "HeldAces" count */
function checkForAce(card) {
    if(card[0] == "a") {
        return 1;
    }
    return 0;
}

