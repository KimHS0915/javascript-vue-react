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

function rePaintField(obj) {
  obj.field.innerHTML = '';
  obj.fieldData.forEach(function(data) {
    cardDomConnect(data, obj.field);
  });
}

function rePaintDeck(obj) {
  obj.deck.innerHTML = '';
  obj.deckData.forEach(function(data) {
    cardDomConnect(data, obj.deck);
  });
}

function rePaintHero(obj) {
  obj.hero.innerHTML = '';
  cardDomConnect(obj.heroData, obj.hero, true);
}

function rePaintDisplay(myDisplay) {
  var obj = myDisplay ? player : rival;
  rePaintField(obj);
  rePaintDeck(obj);
  rePaintHero(obj);
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
  rePaintField(obj);
  rePaintDeck(obj);
  data.field = true;
  obj.cost.textContent = currentCost - data.cost;  
}

function performTurnAction(card, data, myTurn) {
  var friendly = myTurn ? player : rival;
  var enemy = myTurn ? rival : player;
  if (card.classList.contains('card-turnover')) {
    return;
  }
  var enemyCard = myTurn ? !data.mine : data.mine;
  if (enemyCard && friendly.selectedCard) {
    data.hp = data.hp - friendly.selectedCardData.att;
    if (data.hp <= 0) {
      var index = enemy.fieldData.indexOf(data);
      if (index > -1) {
        enemy.fieldData.splice(index, 1);
      } else {
        alert('Game Over');
        initialSetting();
      }
    }
    rePaintDisplay(!myTurn);
    friendly.selectedCard.classList.remove('card-selected');
    friendly.selectedCard.classList.add('card-turnover');
    friendly.selectedCard = null;
    friendly.selectedCardData = null;
    return;
  } else if (enemyCard) {
    return;
  }
  if (data.field) { 
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.remove('card-selected');
    });
    card.classList.add('card-selected');
    friendly.selectedCard = card;
    friendly.selectedCardData = data;
  } else {
    if (deckToField(data, myTurn) !== 'end') {
      myTurn ? createplayerDeck(1) : createRivalDeck(1);
    }
  }
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
    performTurnAction(card, data, turn);
  });
  dom.appendChild(card);
}

function createRivalDeck(num) {
  for (var i = 0; i < num; i++) {
    rival.deckData.push(cardFactory());
  }
  rePaintDeck(rival);
}

function createplayerDeck(num) {
  for (var i = 0; i < num; i++) {
    player.deckData.push(cardFactory(false, true));
  }
  rePaintDeck(player);
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

turnBtn.addEventListener('click', function() {
  var obj = turn ? player : rival;
  document.getElementById('rival').classList.toggle('turn');
  document.getElementById('player').classList.toggle('turn');
  rePaintField(obj);
  rePaintHero(obj);
  turn = !turn;
  if (turn) {
    player.cost.textContent = 10;
  } else {
    rival.cost.textContent = 10;
  }
});

initialSetting();