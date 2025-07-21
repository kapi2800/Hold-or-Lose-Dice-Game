'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.add('player--active');
};

const popper = function () {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = getRandomColor();
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1000);
  }
  console.log('Popper');
};

const winnerNotice = function () {
  document.getElementById('winner-notice').classList.remove('hidden');
  document.getElementById('winner-notice').textContent = `🎉 Player ${
    activePlayer + 1
  } Wins!`;
};
const winnerRem = function () {
  document.getElementById('winner-notice').classList.add('hidden');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  diceEl.classList.add('hidden');
};

//Rolling Dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check Roll 1: if true, switch to next player
    if (dice !== 1) {
      //Add the dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current socre to active player.
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    // scores[1] = scores[1]+ currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player score is >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      popper();
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      winnerNotice();
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  init();
  winnerRem();
});

const container = document.getElementById('confetti-container');

function getRandomColor() {
  const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
  return colors[Math.floor(Math.random() * colors.length)];
}

document.querySelector('.toggle-rules').addEventListener('click', function () {
  document.getElementById('rules').classList.toggle('hidden');
});
