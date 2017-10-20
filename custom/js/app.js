let flipped_cards = 0;
let moves = 0;
let first_card;

/* 
  Much of the game logic happens when the user clicks on a card.
  Here I am capturing the click event and following game logic
  to decide what should happen each time.
*/
$('.card').on('click', function () {
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

      // Check if the two cards match 
      if (first_card.attr('id') === $(this).attr('id')) {
        first_card.addClass('matched');
        $(this).addClass('matched');
        flipped_cards = 0;
        $('.selected').removeClass('selected');
      } else {
        $('.selected').addClass('no-match');
        setTimeout(function () {
          $('.selected').removeClass('selected no-match');
        }, 750);
      }
    }
  }
  // Star rating
  let starHTML = '<li><i class="fa fa-star"></i></li>';

  if (moves <= 10) {
    $('.stars').html(starHTML + starHTML + starHTML)
  } else if (moves <= 15) {
    $('.stars').html(starHTML + starHTML)
  } else if (moves > 15) {
    $('.stars').html(starHTML)
  }
})





// Animation JavaScript
$('.restart').hover(
  function () { $('i.fa-repeat').addClass('fa-spin') },
  function () { $('i.fa-repeat').removeClass('fa-spin') }
)
