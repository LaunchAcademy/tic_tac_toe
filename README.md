# Tic Tac Toe

We're going to be building a tic tac toe application using HTML, CSS, and
Javascript. You've been provided with all of the necessary HTML and CSS.

## Getting Started

```no-highlight
// Clone this repository
git clone git@github.com:LaunchAcademy/tic_tac_toe.git

// Move into the project directory
cd tic_tac_toe

// Open the index page
open index.html
```

**Before you get started, open up `index.html` in your browser and see what
we're starting with.**

## Choosing a Square

### Listening for Clicks on a Square

The first thing that we need to do is add an [event](https://learn.jquery.com/events/handling-events/)
handler function that listens for click events on any of our squares. For now,
we'll just create an alert that says which player clicked on the square.

```javascript
// Within any element with class `.board`, listen for clicks on any element
// with a class `.square`.
$('.board').on('click', '.square', function() {
  alert('Hello World!');
});
```

**Try clicking on some squares in your browser.**

### Determining Which Square Was Clicked

Whenever a jQuery event handler function is triggered, like when we click on a
square, the function receives a [jQuery event object](https://api.jquery.com/category/events/event-object/)
as a parameter. We can use the [event.currentTarget](https://api.jquery.com/event.currentTarget/)
to find the DOM element that was clicked on and store it in a variable.

**Protip: Prefix variables that hold jQuery objects with `$` to make it easy to
know which objects you can call jQuery methods on.**

```javascript
$('.board').on('click', '.square', function(event) {
  // Select the square
  var $square = $(event.currentTarget);
});
```

### Updating the Board

When a user clicks on a square, we want to fill the square with their token. For
now, we'll just assume the 'X' is the only player, which doesn't make sense for
tic tac toe, but we'll fix that later.

You've already been given the CSS to make this work. We can make a square appear
as selected by player 'X' by adding the class `.square-x` to the square. To do
this, we'll use jQuery's [.addClass](http://api.jquery.com/addclass/).

```javascript
$('.board').on('click', '.square', function(event) {
  // Select the square
  var $square = $(event.currentTarget);
  $square.addClass('square-x');
});
```

**Try selecting some squares in the browser to make sure you've got this
working.**

## Multiplayer

This is great and all but we're going to need to allow for two players if we
want this to be a real tic tac toe game.

### Swapping between each player

We can switch between players by creating a variable to store the current
player's token ('x' or 'o'). Whenever a square is clicked on, we swap the
current player's token with the other one.

```javascript
// Initialize current player as player 'x'
var currentPlayerToken = 'x';

$('.board').on('click', '.square', function(event) {
  // Select the square
  var $square = $(event.currentTarget);
  $square.addClass('square-' + currentPlayerToken);

  // Swap current player's token
  if (currentPlayerToken === 'x') {
    currentPlayerToken = 'o';
  } else {
    currentPlayerToken = 'x';
  }
});
```

**Play around with what we've got in the browser. Can you find the bug?**

### Preventing a square from being chosen again

The bug with our current code is that it allows previously chosen squares to be
chosen again. We can prevent a square from being chosen again by adjusting the
CSS selector that we're using in our event handler function. We'll use the
negation CSS psuedo class [:not()](https://developer.mozilla.org/en-US/docs/Web/CSS/:not)
to accomplish this.

```javascript
// Initialize current player as player 'x'
var currentPlayerToken = 'x';

$('.board').on('click', ".square:not('.square-x, .square-o')", function(event) {
  // Select the square
  var $square = $(event.currentTarget);
  $square.addClass('square-' + currentPlayerToken);

  // Swap current player's token
  if (currentPlayerToken === 'x') {
    currentPlayerToken = 'o';
  } else {
    currentPlayerToken = 'x';
  }
});
```

## Finding the Winner

A game isn't a very fun game unless you can declare to your opponent that you
are the victor!

### All the Winning Combinations

Since there aren't actually that many possible winning combinations for tic tac
toe, we're just going to hard code all of the possible winning solutions as a
two dimensional array. Each item in the array will be another array containing
three indices that represent a single winning combination.

In the next step we'll record the index of each square that is chosen by each
player. We can then compare the player's choices to the winning combinations to
determine it there is a winner.

Here is the program up to this point:

```javascript
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

$('.board').on('click', ".square:not('.square-x, .square-o')", function(event) {
  // Select the square
  var $square = $(event.currentTarget);
  $square.addClass('square-' + currentPlayerToken);

  // Swap current player's token
  if (currentPlayerToken === 'x') {
    currentPlayerToken = 'o';
  } else {
    currentPlayerToken = 'x';
  }
});
```

### Storing Each Player's Choices

In order to be able to check if a player has all of the squares required for a
win, we need to track all of the squares that a player has chosen. We'll use a
hash that contains all of the choices for each player in an array.

```javascript
// Initialize a hash to store all of the chosen squares for each player
var chosenSquares = {
  'x': [],
  'o': []
}
```

Whenever a player chooses a square, we'll find the index of that square on the
board by finding all of the squares of the board, then using the [.index()](http://api.jquery.com/index/)
function, passing the chosen square as the argument. Then we record that index
in the array that holds all of the choices for that player. Finally, we're
logging all of the currently chosen squares out to the console so that we can
see if it's working.

```javascript
// ... omitted for brevity

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
  console.log(chosenSquares);

  // Swap current player's token
  if (currentPlayerToken === 'x') {
    currentPlayerToken = 'o';
  } else {
    currentPlayerToken = 'x';
  }
});
```

**Try choosing some squares and looking at the `chosenSquares` hash that is
logged in the javascript console. Remember, you can get to the JS console
with `cmd + option + j`.**

### Checking Choices Against Winning Combinations

The final step to having a working tic tac toe game is to check all of the
player's choices against each of the winning combinations to determine if they
have won.

We want to look at each of the winning combinations, and then determine if the
player has all of the required squares. We do this by iterating over each of
the squares inside of each combination, and using [$.inArray()](https://api.jquery.com/jQuery.inArray/)
to determine the `currentPlayerSquares` array contains the square. `$.inArray()`
is kind of weird in that it will return `-1` if a match is not found.

```javascript
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

  if (hasAllSquares) {
    alert(currentPlayerToken + ' wins!');
  }
});
```

This gets a little bit tricky because we don't want to directly compare the
value of both arrays. If we simply checked if they were equal, that would not
account for having the correctly chosen squares but having chosen them in a
different order. Further, we don't want to say that they don't have all of the
required squares if their array of chosen squares contains extra squares.

We handle this by assuming that they have all of the required squares at the
beginning of each combination iteration, setting `hasAllSquares` to `true`. We
then check for each of the combination's squares inside the
`currentPlayerSquares`, setting `hasAllSquares` to `false` if we find that
the current player doesn't have one of the combination's squares.

If, after looking at all of the required squares for a particular combination,
`hasAllSquares` is `true`, we alert the winner.

## All The Code

```javascript
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
```


## Extra Credit

Fork this repo and refactor the code so that it makes use of [Javascript
Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).

Work through [Functions in Javascript](http://www.codecademy.com/courses/functions-in-javascript-2-0/0/1)
if you need a refresher on using functions in Javascript.
