/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// var score1 = 0;
// var score2 = 0;
var scores, roundScore, activePlayer, gamePlaying, prevScore1, prevScore2, winningScore;
activePlayer = 0;
init();

document.querySelector('.btn-roll').addEventListener('click',  function() {
    if(gamePlaying){
    // 1. Random number  
    var dice1 = Math.floor(Math.random() * 6)+1;
    var dice2 = Math.floor(Math.random() * 6)+1;
    //2.Display the relt
    var diceDOM1 = document.getElementById('Dice-1')
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    var diceDOM2 = document.getElementById('Dice-2')
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    
    //3.Update the round score if  the rolled no. was not a 1
    if((dice1 === 6 && prevScore1 === 6 ) && (dice2 === 6 && prevScore2 === 6) ) {
        scores[activePlayer] = 0; 
        document.getElementById('score-'+activePlayer).textContent = '0';
         nextPlayer();
         
     }  
    else if (dice1 !== 1 && dice2 !== 1) {
            //add score
         roundScore += dice1+dice2;
         document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        //next player
       nextPlayer();  }
       prevScore1 = dice1;
       prevScore2 = dice2;
    }


}); 


document.querySelector('.btn-hold').addEventListener('click',  function() {
    if(gamePlaying){
    scores[activePlayer] += roundScore// Number (document.getElementById('current-' + activePlayer).textContent);
    document.getElementById('score-' + activePlayer).textContent =  scores[activePlayer];    
    var input =  document.getElementById('win-score').value;
    if(input){
        winningScore = input;
    }
    else{
        winningScore = 100;
    }        

    if(scores[activePlayer] >= winningScore ){
       document.getElementById('name-'+ activePlayer).textContent  = 'WINNER!'; 
       hideDice();
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
hideDice();
    
}

document.querySelector('.btn-new').addEventListener('click', init);
function init(){
scores = [0,0];
roundScore = 0;
 gamePlaying = true; 

hideDice();

//document.querySelector('.dice').style.display = 'none';

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
function hideDice(){
    document.getElementById('Dice-1').style.display = 'none';
    document.getElementById('Dice-2').style.display = 'none';
}





