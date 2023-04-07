
/*----- constants -----*/

var gameWords = [
    'CHEESE', 
    'MOUSE', 
    'JERRY', 
    'BROWN', 
    'CAT',  
    'CHASE',
    'TOM',
    'MILK',
    'CHICKEN',
    'BONES',
    'FIGHT',
    'FRIENDSHIP',
    'INTELLIGENT',
    'UNITY',
    'SURRENDER',
    'GREAT',
    'SHARP',
    'FAST',
    'LUCKY',
    'INTELLIGENT',
    'MASTERMIND',
    'BELIEVER',
    'FELLOWSHIP',
    'UNLUCKY',
    'UNIQUE',
    'CUNNING',
    'FAITH'
];

/*----- app's state (variables) -----*/


var hint;
var usedLetter;
var secretWord; /*holds the randomly chosen word from the words array*/
var wrongLetter;/*intialize to 9; dec. with each wrong guess*/
var guessLetter; /*holds the player's guess so far. Initialize to be a string of '_''s - same # as length a secretWord


/*----- cached(saving) element references -----*/

var $guess = $('#guess');
var $img = $('#img');
var $hint = $('#hint');
var $message = $('#message');
var $winMessage = $('#winMessage');

/*---- event listeners -----*/

$('table').on('click', 'td', handleLetterClick)
$('#newgame').on('click', initialize)    

/*--------- functions --------*/

initialize();

function handleLetterClick(evt) {
    var letter = evt.target.innerHTML;
    if(usedLetter.includes(letter)) {
      return;
    } else {
      usedLetter.push(letter);
    }

    if(secretWord.includes(letter)) {
        var position = secretWord.indexOf(letter);
        while (position >= 0) {
          guessLetter = guessLetter.split('');
          guessLetter[position] = letter;
          guessLetter = guessLetter.join('');
          position = secretWord.indexOf(letter, position + 1);
        } //end of while statement
    } else if (wrongLetter > 0) {
        wrongLetter--;
    } else {
        return;
    }
        render();
} //end of handleLetterClick function

initialize();

function initialize() {
    wrongLetter = 9;
    secretWord = gameWords[getRandomIntegers(gameWords.length-1)];
    guessLetter = '_'.repeat(secretWord.length);
    usedLetter = [];
    $('td').removeClass('disable-td');
    
    if(secretWord === 'GREAT' || secretWord === 'SHARP' || secretWord === 'FAST' || secretWord === 'LUCKY' || secretWord ==='INTELLIGENT' || secretWord ==='MASTERMIND')
    {
        $hint.html("this word relates to Jerry And Jerry's Features");
    }
    else if(secretWord ==='FIGHT' || secretWord ==='FREINDSHIP' || secretWord ==='UNITY' || secretWord ==='SURRENDER' || secretWord ==='BELIEVER' || secretWord ==='FELLOWSHIP' || secretWord=== 'FOREVER')
    {
        $hint.html("this word relates to Tom and Jerry Both");

    }
    else if(secretWord=== 'CHEESE' || secretWord==='MOUSE' || secretWord ==='BROWN' || secretWord=== 'TRICKY')
    {
        $hint.html("this word relates to only Jerry");
    }
    else if(secretWord=== 'BONES' || secretWord==='MILK' || secretWord ==='CHICKEN' || secretWord=== 'FAITH')
    {
        $hint.html("this word relates to only Tom");
    }
     else if (secretWord === 'CAT' || secretWord === 'CHASE' || secretWord === 'TOM' || secretWord === 'UNLUCKY' || secretWord ==='UNIQUE' || secretWord==='CUNNING') 
    {
        $hint.html("this word relates to Tom And Tom's Features");
    } else 
    {
        $hint.html('');
    }

    render();
}

function getRandomIntegers(max) {
    return Math.floor(Math.random() * (max +1));
}


function render() {
    $(guess).html(guessLetter);
    $('#wrongLetter').html(wrongLetter);
    usedLetter.forEach(function(letter) {
        $('#' + letter).addClass('disable-td');
    });
    $img.attr('src', 'img' + wrongLetter + '.png');

    if(guessLetter === secretWord) {
				$winMessage.html('YOU WIN').css('color', 'green');
        $('table').css('visibility', 'hidden');
    } else if (wrongLetter === 0) {
				$message.html('YOU LOSE. ' + '<br>' + 'The answer is ' + secretWord).css('color', 'red');
        $('table').css('visibility', 'hidden');
    } else {
				$message.html('');
				$winMessage.html('');
        $('table').css('visibility', 'visible');
    } //end of if/else statement
} //end of initialize function






