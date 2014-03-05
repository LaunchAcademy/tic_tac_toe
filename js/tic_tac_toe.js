var winningCombinations = [
  // Horizontals
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Verticals
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize current player as player 'x'
var currentPlayerToken = 'x';

// Initialize a hash to store all of the chosen squares for each player
var chosenSquares = {
  'x': [],
  'o': []
}

$('.board').on('click', ".square:not('.square-x, .square-o')", function(event) {
  // Select the square
  var $square = $(event.currentTarget);
  $square.addClass('square-' + currentPlayerToken);

  // Record player's choice
  var indexOfSquare = $('.board .square').index($square);
  var currentPlayerSquares = chosenSquares[currentPlayerToken]
  currentPlayerSquares.push(indexOfSquare);

  // Check for win
  //
  // For each winning combination
  $.each(winningCombinations, function(index, combination) {
    // Stary by assuming that the player has all of the squares
    var hasAllSquares = true;

    // For each of squares in the combination
    $.each(combination, function(index, square) {
      // If the player's chosen squares does not contain the current square
      if ($.inArray(square, currentPlayerSquares) === -1) {
        hasAllSquares = false;
      }
    });

    // Display the winner
    if (hasAllSquares) {
      alert(currentPlayerToken + ' wins!');
    }
  });

  // Swap current player's token
  if (currentPlayerToken === 'x') {
    currentPlayerToken = 'o';
  } else {
    currentPlayerToken = 'x';
  }
});
