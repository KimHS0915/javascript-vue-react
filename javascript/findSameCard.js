var hor = 4;
var ver = 3;

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
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener('click', function() {
        c.classList.toggle('flipped');
      });
    })(card);
    document.body.appendChild(card);
  }
}

cardSetting(hor, ver);