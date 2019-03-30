// Creates an array that lists all the words to be guessed.
var words = ["pensieve", "portkey", "broomstick", "deluminator", "horcrux", 
"howler", "wand", "remembrall", "sneakoscope", "quaffle", "cauldron", "dragon"];

//Used to record what character is pressed
var letterBank = ["a", "b", "c", "d", "e", "f", "g",
"h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
"r", "s", "t", "u", "w", "x", "y", "z"]

//global variables
var chosenWord = "";
var wrongLetters = [];
var lettersInWord = [];
var numChar = "";
var lettersAndDashes = [];
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
	lettersAndDashes =[];
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
	//Splits the chosen word into individual letters
	lettersInWord = chosenWord.split('');
	//Get the number of characters
    numChar = lettersInWord.length;
    //Make empty spaces remain empty spaces
   
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	lettersAndDashes =[];
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
        lettersAndDashes.push("_");
        currentwordText.textContent = lettersAndDashes;
    }

	//html changes
		//puts spaces between characters instead of commas
    currentwordText.textContent = lettersAndDashes.join(' ');
	guessesremainingText.textContent = guessesLeft;
	winsText.textContent = wins;
	lossesText.textContent = losses;
	guessesText.textContent = wrongLetters;
	
	
    console.log(chosenWord);
	console.log(lettersInWord);
	console.log(numChar);
    console.log(lettersAndDashes);
}

function compareLetters(userKey)
{
				//Determines if the chosen letter is in the chosen word 
				if(chosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of characters 
					for(var i = 0; i < numChar; i++)
					{
						//Fills in empty space with chosen letter
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							lettersAndDashes[i] = userKey;
							currentwordText.textContent = lettersAndDashes.join(' ');
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
	// If the number of correct guesses equals the number of letters in the word then you win
	if(rightGuessCounter === numChar)
	{
		//Counts Wins 
		wins++;
		//Changes HTML
		winsText.textContent = wins;
		directionsText.textContent = "You win! Press any letter to play again.";
		//Holds screen for 1.5 seconds before reset
		setTimeout(function(){ reset(); }, 1500);
	}
	// If number of incorrect guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		losses++;
		//Changes HTML
		lossesText.textContent = losses;
		directionsText.textContent = "You lose :( Press any letter to play again.";
		//Holds screen for 1.5 seconds before reset
		setTimeout(function(){ reset(); }, 1500);
	}
}
// audio functions

var song = document.getElementById("HPtheme");

function playAudio() {
	song.play();
}

function pauseAudio() {
	song.pause();
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
			//removes letter from word bank once used
			var spliceDword = letterBank.splice(i,1);
			//Changes text after the first letter is guessed
			directionsText.textContent = "Keep Guessing!"
			compareLetters(letterGuessed);
			winLose();
		}
	}			
}