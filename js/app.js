/*
 * Create a list that holds all of your cards
 */

//const child = '<li class="card"><i class="fa fa-bolt"></i></li>';
//const deck = document.querySelector(".deck");
//const li = document.createElement('li');
//li.setAttribute('class', 'card');
//deck.appendChild(li);


let deckArray = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt","fa-bolt", "fa-cube","fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

document.querySelector('.restart').addEventListener('click', function(){
 	stopTimer();
 	init();
 	start();
});

start();
var cardBuffer = null;
var movesCounter=0;
var timer=0;
var matchCount=0;
var setIntervalID;
var stars = 3;

function init(){
	shuffle (deckArray);
	cardBuffer = null;
	movesCounter=0;
	timer=0;
	matchCount=0;
	setIntervalID;
	stars = 3;

	const starsList = document.querySelectorAll('.stars li');

	for (let h = 0; h < starsList.length; h++){
			starsList[h].style.display = '';
	}

	document.querySelector('#timer').innerHTML='0';

	const moves =document.querySelector('.moves');

	moves.innerHTML='0';

	document.querySelector('.deck').innerHTML='';
}


function start(){
	init();
	movesCounter=0;
	for (let n = 0; n < deckArray.length; n++){
	const deck=document.querySelector('.deck');
	const li=document.createElement('li');
	li.setAttribute('class', 'card');
	deck.appendChild(li);
	const i=document.createElement('i');
	i.setAttribute('class', 'fa ' + deckArray[n]);
	li.appendChild(i);
	li.addEventListener('click', function(){
		starRating();
		if(openCard(li)){
			if (cardBuffer==null){
				cardBuffer=li;
				
			}
			else{
				matchCards(cardBuffer, li);
			}
		}
		if (movesCounter==1)
			timeCouner();

		if (matchCount==8){
			endGame();
		}
	});

	}
}

function matchCards(card1, card2){
	const card2Image=card1.querySelector('i').getAttribute('class');
	const card1Image=card2.querySelector('i').getAttribute('class');
	if (card2Image==card1Image){
		//alert('match');
		cardBuffer=null;

		card2.setAttribute('class','card open show');
		matchCount++;

	}
	else{
		//alert('not match');
		cardBuffer=null;

		setTimeout(function closeCards(){
			card1.setAttribute('class','card');
			card2.setAttribute('class','card');
		},500); 
	}

}

function openCard(card){
	if(card.getAttribute('class')=='card open show'){
			return false;
		}

	card.setAttribute('class', 'card open show');
	movesCounter++;
	const moves =document.querySelector('.moves');
	moves.innerHTML=movesCounter;
	return true;
}

//Decreasing Starts Rating after number of moves.
function starRating (){
	if (movesCounter == 24 || movesCounter == 30){
		const starsList = document.querySelectorAll('.stars li');
		for (let h = 0; h < starsList.length; h++){
			if(starsList[h].style.display !== 'none'){
				starsList[h].style.display = 'none';
				stars--;
				break;
			}
		}
	}
}

//Time Function.

function timeCouner(){
setIntervalID=setInterval(function(){
	timer+=1;
	document.querySelector('#timer').innerHTML=timer;
}, 1000);

	

}


function stopTimer(){
	window.clearInterval(setIntervalID);
}

function endGame(){
	stopTimer();
	setTimeout(function(){
		var msgStr = 'End of Game. You completed in ' + movesCounter + ' Moves' + '\n and in ' + timer 
		+ ' seconds \n with ' + stars + 'rating';
		alert(msgStr);
	}, 500);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
