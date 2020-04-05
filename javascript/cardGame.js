var rival = {
  hero : document.getElementById('rival-hero'),
  deck : document.getElementById('rival-deck'),
  field : document.getElementById('rival-field'),
  cost : document.getElementById('rival-cost'),
  deckData : [],
  heroData : [],
  fieldData : [],
  selectedCard : null,
  selectedCardData : null,
};

var player = {
  hero : document.getElementById('player-hero'),
  deck : document.getElementById('player-deck'),
  field : document.getElementById('player-field'),
  cost : document.getElementById('player-cost'),
  deckData : [],
  heroData : [],
  fieldData : [],
  selectedCard : null,
  selectedCardData : null,
}

var turnBtn = document.getElementById('turn-btn');
var turn = true;

function rePaintDisplay(myDisplay) {
  var obj = myDisplay ? player : rival;
  obj.deck.innerHTML = '';
  obj.field.innerHTML = '';
  obj.hero.innerHTML = '';
  obj.fieldData.forEach(function(data) {
    cardDomConnect(data, obj.field);
  });
  obj.deckData.forEach(function(data) {
    cardDomConnect(data, obj.deck);
  });
  cardDomConnect(obj.heroData, obj.hero, true);
}

function deckToField(data, myTurn) {
  var obj = myTurn ? player : rival;
  var currentCost = Number(obj.cost.textContent);
  if (currentCost < data.cost) {
    return 'end';
  }
  var idx = obj.deckData.indexOf(data);
  obj.deckData.splice(idx, 1);
  obj.fieldData.push(data);
  obj.deck.innerHTML = '';
  obj.field.innerHTML = '';
  obj.fieldData.forEach(function(data) {
    cardDomConnect(data, obj.field);
  });
  obj.deckData.forEach(function(data) {
    cardDomConnect(data, obj.deck);
  });
  data.field = true;
  obj.cost.textContent = currentCost - data.cost;  
}

function cardDomConnect(data, dom, hero) {
  var card = document.querySelector('.card-hidden .card').cloneNode(true);
  card.querySelector('.card-cost').textContent = data.cost;
  card.querySelector('.card-att').textContent = data.att;
  card.querySelector('.card-hp').textContent = data.hp;
  if (hero) {
    card.querySelector('.card-cost').style.display = 'none';
    var name = document.createElement('div');
    name.textContent = 'Hero';
    card.appendChild(name);
  }
  card.addEventListener('click', function() {
    console.log(card, data)
    if (turn) {
      if (card.classList.contains('card-turnover')) {
        return;
      }
      if (!data.mine && player.selectedCard) {
        data.hp = data.hp - player.selectedCardData.att;
        if (data.hp <= 0) {
          var index = rival.fieldData.indexOf(data);
          if (index > -1) {
            rival.fieldData.splice(index, 1);
          } else {
            alert('You Win!');
            initialSetting();
          }
        }
        rePaintDisplay(false);
        player.selectedCard.classList.remove('card-selected');
        player.selectedCard.classList.add('card-turnover');
        player.selectedCard = null;
        player.selectedCardData = null;
        return;
      } else if (!data.mine) {
        return;
      }
      if (data.field) { 
        card.parentNode.querySelectorAll('.card').forEach(function (card) {
          card.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
        player.selectedCard = card;
        player.selectedCardData = data;
      } else {
        if (deckToField(data, true) !== 'end') {
          createplayerDeck(1);
        }
      }
    } else {
      if (card.classList.contains('card-turnover')) {
        return;
      }
      if (data.mine && rival.selectedCard) {
        data.hp = data.hp - rival.selectedCardData.att;
        if (data.hp <= 0) {
          var index = player.fieldData.indexOf(data);
          if (index > -1) {
            player.fieldData.splice(index, 1);
          } else {
            alert('You Lose!');
            initialSetting();            
          }
        }
        rePaintDisplay(true);
        rival.selectedCard.classList.remove('card-selected');
        rival.selectedCard.classList.add('card-turnover');
        rival.selectedCard = null;
        rival.selectedCardData = null;
        return;
      } else if (data.mine) {
        return;
      }
      if (data.field) {
        card.parentNode.querySelectorAll('.card').forEach(function (card) {
          card.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
        rival.selectedCard = card;
        rival.selectedCardData = data;
      } else {
        if (deckToField(data, false) !== 'end') {
          createRivalDeck(1);
        }
      }
    }
  });
  dom.appendChild(card);
}

function createRivalDeck(num) {
  for (var i = 0; i < num; i++) {
    rival.deckData.push(cardFactory());
  }
  rival.deck.innerHTML = '';
  rival.deckData.forEach(function(data) {
    cardDomConnect(data, rival.deck);
  });
}

function createplayerDeck(num) {
  for (var i = 0; i < num; i++) {
    player.deckData.push(cardFactory(false, true));
  }
  player.deck.innerHTML = '';
  player.deckData.forEach(function(data) {
    cardDomConnect(data, player.deck);
  });  
}

function createRivalHero() {
  rival.heroData = cardFactory(true);
  cardDomConnect(rival.heroData, rival.hero, true);
}

function createplayerHero() {
  player.heroData = cardFactory(true, true);
  cardDomConnect(player.heroData, player.hero, true);
}

function Card(playerCard) {
  this.att = Math.ceil(Math.random() * 5);
  this.hp = Math.ceil(Math.random() * 5);
  this.cost = Math.floor(this.att + this.hp) / 2;
  if (playerCard) {
    this.mine = true;
  }
}

function HeroCard(playerCard) {
  this.att = Math.ceil(Math.random() * 2);
  this.hp = Math.ceil(Math.random() * 5) + 15;
  this.hero = true;
  this.field = true;
  if (playerCard) {
    this.mine = true;
  }
}

function cardFactory(hero, playerCard) {
  if (hero) {
    return new HeroCard(playerCard);
  } else {
    return new Card(playerCard);
  }
}

function initialSetting() {
  [rival, player].forEach(function (item) {
    item.heroData = [];
    item.fieldData = [];
    item.deckData = [];
    item.selectedCardData = [];
  });
  createRivalDeck(5);
  createplayerDeck(5);
  createRivalHero();
  createplayerHero();
  rePaintDisplay(true);
  rePaintDisplay(false);
}

initialSetting();

turnBtn.addEventListener('click', function() {
  var obj = turn ? player : rival;
  document.getElementById('rival').classList.toggle('turn');
  document.getElementById('player').classList.toggle('turn');
  obj.field.innerHTML = '';
  obj.hero.innerHTML = '';
  obj.fieldData.forEach(function(data) {
    cardDomConnect(data, obj.field);
  });
  cardDomConnect(obj.heroData, obj.hero, true);

  turn = !turn;
  if (turn) {
    player.cost.textContent = 10;
  } else {
    rival.cost.textContent = 10;
  }
});