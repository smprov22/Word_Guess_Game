// Creates an array that lists all the words to be guessed.
var words = ["pensieve", "portkey", "broomstick", "deluminator", "horcrux"];

//Used to record what character is pressed
var letterBank = ["a", "b", "c", "d", "e", "f", "g",
"h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
"r", "s", "t", "u", "w", "x", "y", "z"]

//variables
var chosenWord = "";
var wrongLetters = [];
var lettersInWord = [];
var numChar = "";
var blanksAndSuccesses = [];
var guessesremaining = 10;
var wins = 0;
var losses = 0;
var directionsText = document.getElementById("directions-text");
var currentwordText = document.getElementById("currentword");
var guessesText = document.getElementById("guesses");
var guessesremainingText = document.getElementById("guesses-remaining");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

function reset() {
// Randomly chooses a word from the options array. This is the chosen word.
    chosenWord = words[Math.floor(Math.random() * words.length)];
// splits word into individual letters
    lettersInWord = chosenWord.split("");
//gets the number of characters
    numChar = lettersInWord.length;

//RESET
	//===========================================================
    letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letterBank = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];
	test=false;
	startGame();
}

function startGame() {
	//Chooses word randombly from the wordBank
	chosenWord = words[Math.floor(Math.random() * words.length)];
	//Splits the choosen word into individual letters
	lettersInWord = chosenWord.split('');
	//Get the number of characters
    numChar = lettersInWord.length;
    //Make empty spaces remain empty spaces
   
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letterBank = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
                      'y','z'];
                      
    //Generate characters
    for(var i = 0; i < numChar; i++) {
        blanksAndSuccesses.push("_");
        currentwordText.textContent = blanksAndSuccesses;
    }

    //html changes
    currentwordText.textContent = blanksAndSuccesses.join(' ');
	guessesremainingText.textContent = guessesLeft;
	winsText.textContent = wins;
	lossesText.textContent = losses;
	guessesText.textContent = wrongLetters;
	
	
    console.log(chosenWord);
	console.log(lettersInWord);
	console.log(numChar);
    console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
				//If user key exists in chosen word then perform this function 
				if(chosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numChar; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							currentwordText.textContent = blanksAndSuccesses.join(' ');
						}	
					}
				}
				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					guessesremainingText.textContent = guessesLeft;
					guessesText.textContent = wrongLetters;
				}
}
function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numChar)
	{
		//Counts Wins 
		wins++;
		//Changes HTML
		winsText.textContent = wins;
		directionsText.textContent = "You win! Press any letter to play again."
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		losses++;
		//Changes HTML
		lossesText.textContent = losses;
		directionsText.textContent = "You lose :( Press any letter to play again."
		reset();
	}
}
// audio functions
function loop() {
	document.getElementById("music").loop = true;
}

document.getElementById("audio-icon").onclick =
function() {enableMute()};

function enableMute() {
	var x = document.getElementById("myAudio");
	x.muted = true;
} 

//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < letterBank.length; i++)
	{	
		if(letterGuessed === letterBank[i] && test === true)
		{
			var spliceDword = letterBank.splice(i,1);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}