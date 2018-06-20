const deck = document.querySelector('.deck');
//const card = document.querySelectorAll('.card');
const resetButton = document.querySelector('.restart');
const moves = document.querySelector('.moves');
const starLi = document.querySelector('.stars').querySelectorAll('i');

// this is my decklist to be shuffled and appended
let deckList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 
'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];


let showCard = [];
moves.innerHTML = 0; // how many moves it is taking you to complete the game
shuffle(deckList); // this is going to randomize the deckList
createElement(); // the decklist is shuffled first then appened to the html elements

let counter = 0; // winning condition



function createElement(){ // creating the new cards by appending
	var card = document.querySelectorAll('.card'); // BECARE ABOUT THIS PART


	for(let i = 0; i < deckList.length; i++){
	 	//For every single element
	 	//1.Creates Li and I
		let liCard = document.createElement('li'); // create li element
		let iCard = document.createElement('i'); // create i element
		//2. add classes to it
		liCard.className = 'card'; // giving liCard a card class
	    iCard.className = 'fa' + ' ' + deckList[i]; // giving iCard a fa class and a decklist
	    //3. append i to li
	    liCard.appendChild(iCard); // appending the iCard to the liCard
	    // console.log(liCard);
	    console.log(liCard.childNode);
	    //4. replaces li with old li
	    deck.replaceChild(liCard, card[i]); // replaces each card with the liCard that we made
	    addingClick(liCard); // when you click add show to liCard
	    newGame(liCard); // this will reset the game
	}
}

function addingClick(text){ // this will show card when clicked (text palceholder is liCard)
	text.addEventListener('click', function(){ // when you click liCard
			text.className += ' ' + 'show'; // add the show class to the liCard that we clicked
			showCard.push(text); // pushed it inside an array called showCard

			if(showCard.length === 2){ // if there are two cards in the array
				if(showCard[0].lastChild.classList[1] === showCard[1].lastChild.classList[1]){
					showCard[0].classList.toggle('match');
					showCard[1].classList.toggle('match');
					counter++;
					starRating(counter);
					showCard = []; //
					}	
				}else if(showCard.length === 3){
					showCard[0].classList.toggle('show');
					showCard[1].classList.toggle('show');
					showCard.shift();
					showCard.shift();
					console.log('working');
					moves.innerHTML++;
			}

	});
}

function starRating(counter){ // This will give you a score on how well you do
	if(counter === 8){
		if(moves > 20){
			starLi[0].style.color = 'yellow';
		}else if(moves > 10){
			starLi[0].style.color = 'yellow';
			starLi[1].style.color = 'yellow';
		}else{
			starLi[0].style.color = 'yellow';
			starLi[1].style.color = 'yellow';
			starLi[2].style.color = 'yellow';
		}
		alert('You Win!');
	}
}


function newGame(text){ // this will reset the game
	resetButton.addEventListener('click', function(){
		moves.innerHTML = 0;
		showCard = []; // empties out the showCard array
		text.classList.remove('show'); // remove all the show class
		text.classList.remove('match'); // remove all the match class
		for(let i = 0; i < starLi.length; i++){ // this will turn all the stars black again
			starLi[i].style.color = 'black';
		}
		shuffle(deckList);
		createElement();
	})
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) { // while currentIndex is not 0
        randomIndex = Math.floor(Math.random() * currentIndex);
        // the randomIndex will be a random number than is rounded down multiplied by cthe currentIndex
        currentIndex -= 1; // drop the currentIndex by 1 (but why?)
        temporaryValue = array[currentIndex]; // temporaryValue will be the array of currentIndex
        array[currentIndex] = array[randomIndex]; // the array of currentIndex will now be a randomIndex
        array[randomIndex] = temporaryValue; // that randomIndex will now be tempoararyValue
    }
    return array;
}


