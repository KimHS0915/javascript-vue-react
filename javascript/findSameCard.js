var hor = 4;
var ver = 3;
var colorList = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'blue', 'blue', 'indigo', 'indigo'];
var colors = [];
var clickFlag = false;
var clickCards = [];
var completeCards = [];

for (var i = 0; colorList.length > 0; i++) {
  colors = colors.concat(colorList.splice(Math.floor(Math.random() * colorList.length), 1));
}
console.log(colors);

function cardSetting (hor, ver) {
  for (var i = 0; i < hor * ver; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = colors[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener('click', function() {
        if (clickFlag && !completeCards.includes(c)) {
          c.classList.toggle('flipped');
          clickCards.push(c);
          if (clickCards.length === 2) {
            if (clickCards[0].querySelector('.card-back').style.backgroundColor === clickCards[1].querySelector('.card-back').style.backgroundColor) {
              completeCards.push(clickCards[0]);
              completeCards.push(clickCards[1]);
              clickCards = [];
            } else {
              clickFlag = false;
              setTimeout(function() {
                clickCards[0].classList.remove('flipped');
                clickCards[1].classList.remove('flipped');
                clickFlag = true;
                clickCards = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.body.appendChild(card);
  }

  document.querySelectorAll('.card').forEach(function (card, index) {
    setTimeout(function() {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function() {
    document.querySelectorAll('.card').forEach(function (card, index) {
      card.classList.remove('flipped');
    });
    clickFlag = true;
  }, 5000);
}

cardSetting(hor, ver);