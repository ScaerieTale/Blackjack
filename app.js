// global variables needed for the game to function
let dealerCardSum = 0;
let playerCardSum = 0;
/* Because Aces can be 1 or 11 in Blackjack, it's important
that we keep track of how many both the dealer and player
are holding at any given time within a round. */
let dealerHeldAces = 0;
let playerHeldAces = 0;

// For the Dealer's hidden card
let hidden;

let deck; // for the deck(s)

/* playerCanHit means that you're not at 21 or above, and
can draw another card. Default is true */
let playerCanHit = true;

// end of global variables





