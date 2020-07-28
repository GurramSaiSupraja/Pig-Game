/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1(the dice is not shown actually), all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// var score1 = 0;
// var score2 = 0;
var scores, roundScore, activePlayer, gamePlaying;
activePlayer = 0;
init();


document.querySelector('.btn-roll').addEventListener('click',  function() {
    if(gamePlaying){
    // 1. Random number  
    var dice = Math.floor(Math.random() * 6)+1;
     
    //2.Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3.Update the round score if  the rolled no. was not a 1
    if (dice !== 1 ) {        
        
        //add score
         roundScore += dice;
         document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        //next player
       nextPlayer();  }
       
    }


}); 


document.querySelector('.btn-hold').addEventListener('click',  function() {
    if(gamePlaying){
    scores[activePlayer] += roundScore;// Number (document.getElementById('current-' + activePlayer).textContent);
    document.getElementById('score-' + activePlayer).textContent =  scores[activePlayer];    
    
        
    if(scores[activePlayer] >= 100 ){
       document.getElementById('name-'+ activePlayer).textContent  = 'WINNER!'; 
       document.querySelector('.dice').style.display = 'none';
       document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
       document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
       gamePlaying = false;

    }else{
        nextPlayer();
    }
}
});

function nextPlayer(){
    document.getElementById('current-' + activePlayer).textContent = '0' ;
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1; 
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none';
    
}

document.querySelector('.btn-new').addEventListener('click', init);
function init(){
scores = [0,0];
roundScore = 0;

 gamePlaying = true; 

document.querySelector('.dice').style.display = 'none';
document.getElementById('name-0').textContent  = 'PLAYER 1';
document.getElementById('name-1').textContent  = 'PLAYER 2';
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-'+  activePlayer+'-panel').classList.remove('winner');

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
activePlayer = 0;

}




