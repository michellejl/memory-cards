let flipped_cards = 0;
let moves = 0;
let first_card;
let matched_sets = 0;

// Timer Variables
let stime = 0;
let mtime = 0;
let minutes = 0;
let seconds = 0;

// available images
let card_images = [
  "axe",
  "backpack-1",
  "cabin",
  "campfire",
  "canoe",
  "lamp-1",
  "swiss-army-knife",
  "tent-1"
]

// Deck setup 
randomizeCards(card_images);


/* 
  Much of the game logic happens when the user clicks on a card.
  Here I am capturing the click event and following game logic
  to decide what should happen each time.
*/
$('body').on('click', '.card', function () {

  // Starts timer on first card clicked
  if (moves === 0 && flipped_cards === 0) {
    var counter = setInterval(timer, 1000);
  }

  // Checks to make sure the card clicked isn't already selected
  if (!$(this).hasClass('selected')) {
    $(this).addClass('selected');

    // Checks how many cards I have flipped
    if (flipped_cards === 0) {
      first_card = $(this);
      flipped_cards++;
    } else if (flipped_cards === 1) {
      // If this is the second card to be flipped,
      // Increment the moves counter and reset flipped_cards
      moves++;
      $('.count').text(moves);
      flipped_cards = 0;

      checkMatch(first_card, this)
    }
  }
  starRating(moves)
})

// Check if cards match
function checkMatch(card1, card2) {
  if (card1.attr('id') === $(card2).attr('id')) {
    card1.addClass('matched');
    $(card2).addClass('matched');
    flipped_cards = 0;
    $('.selected').removeClass('selected');
    matched_sets++;
    if (matched_sets === 1) {
      victoryScreen(moves, minutes, seconds);
    }
  } else {
    $('.selected').addClass('no-match');
    setTimeout(function () {
      $('.selected').removeClass('selected no-match');
    }, 1000);
  }
}

// Checks move count to update star rating
function starRating(moves) {
  let starHTML = '<li><i class="fa fa-star"></i>&nbsp;</li>';

  if (moves <= 10) {
    $('.stars').html(starHTML + starHTML + starHTML)
  } else if (moves <= 15) {
    $('.stars').html(starHTML + starHTML)
  } else if (moves > 15) {
    $('.stars').html(starHTML)
  }
}

// Function for game timer
function timer() {
  stime++;
  if (stime === 60) {
    stime = 0;
    mtime++;
  }

  if (stime <= 9) {
    seconds = '0' + stime;
  } else {
    seconds = stime;
  }

  if (mtime <= 9) {
    minutes = '0' + mtime;
  } else {
    minutes = mtime;
  }

  $('.timer').html(minutes + ':' + seconds)
  return (minutes, seconds)
}

// Randomize card order
function randomizeCards(cardArray) {
  let shuffledDeck = '';
  fullDeck = cardArray.concat(cardArray);
  fullDeck.sort(function () { return 0.5 - Math.random() });

  for (var i = 0; i < fullDeck.length; i++) {
    let cardHTML = '<li class="card" id="' + fullDeck[i] + '"></li>';
    shuffledDeck = shuffledDeck + cardHTML;
  }
  $('.deck').html(shuffledDeck);
}

function victoryScreen(moves, minutes, seconds) {
  // clearInterval(counter);
  $('.final-moves').html(moves);
  $('.final-minutes').html(minutes);
  $('.final-seconds').html(seconds);
  console.log(minutes + ' ' + seconds)
  $('.win-screen').css('display', 'block');
}


// Animation JavaScript
$('.restart').hover(
  function () { $('i.fa-repeat').addClass('fa-spin') },
  function () { $('i.fa-repeat').removeClass('fa-spin') }
)



