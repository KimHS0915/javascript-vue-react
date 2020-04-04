var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalField = document.getElementById('rival-field');
var myField = document.getElementById('my-field');
var rivalCost = document.getElementById('rival-cost');
var myCost = document.getElementById('my-cost');
var turnBtn = document.getElementById('turn-btn');
var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;
var rivalFieldData = [];
var myFieldData = [];
var turn = true;

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
  card.addEventListener('click', function(card) {
    if (turn) {
      if (!data.mine || data.field) {
        return;
      }
      var currentCost = Number(myCost.textContent);
      if (currentCost < data.cost) {
        return;
      }
      var idx = myDeckData.indexOf(data);
      myDeckData.splice(idx, 1);
      myFieldData.push(data);
      myDeck.innerHTML = '';
      myField.innerHTML = '';
      myFieldData.forEach(function(data) {
        cardDomConnect(data, myField);
      });
      myDeckData.forEach(function(data) {
        cardDomConnect(data, myDeck);
      });
      data.field = true;
      myCost.textContent = currentCost - data.cost;
      createMyDeck(1);
    } else {
      if (data.mine || data.field) {
        return;
      }
      var currentCost = Number(rivalCost.textContent);
      if (currentCost < data.cost) {
        return;
      }      
      var idx = rivalDeckData.indexOf(data);
      rivalDeckData.splice(idx, 1);
      rivalFieldData.push(data);
      console.log(rivalDeckData, rivalFieldData);
      rivalDeck.innerHTML = '';
      rivalField.innerHTML = '';
      rivalFieldData.forEach(function(data) {
        cardDomConnect(data, rivalField);
      });
      rivalDeckData.forEach(function(data) {
        cardDomConnect(data, rivalDeck);
      });
      data.field = true;
      rivalCost.textContent = currentCost - data.cost;
      createRivalDeck(1);
    }
  });
  dom.appendChild(card);
}

function createRivalDeck(num) {
  for (var i = 0; i < num; i++) {
    rivalDeckData.push(cardFactory());
  }
  rivalDeck.innerHTML = '';
  rivalDeckData.forEach(function(data) {
    cardDomConnect(data, rivalDeck);
  });
}

function createMyDeck(num) {
  for (var i = 0; i < num; i++) {
    myDeckData.push(cardFactory(false, true));
  }
  myDeck.innerHTML = '';
  myDeckData.forEach(function(data) {
    cardDomConnect(data, myDeck);
  });  
}

function createRivalHero() {
  rivalHeroData = cardFactory(true);
  cardDomConnect(rivalHeroData, rivalHero, true);
}

function createMyHero() {
  myHeroData = cardFactory(true, true);
  cardDomConnect(myHeroData, myHero, true);
}

function Card(myCard) {
  this.att = Math.ceil(Math.random() * 5);
  this.hp = Math.ceil(Math.random() * 5);
  this.cost = Math.floor(this.att + this.hp) / 2;
  if (myCard) {
    this.mine = true;
  }
}

function HeroCard(myCard) {
  this.att = Math.ceil(Math.random() * 2);
  this.hp = Math.ceil(Math.random() * 5) + 15;
  this.hero = true;
  if (myCard) {
    this.mine = true;
  }
}

function cardFactory(hero, myCard) {
  if (hero) {
    return new HeroCard(myCard);
  } else {
    return new Card(myCard);
  }
}

function initialSetting() {
  createRivalDeck(5);
  createMyDeck(5);
  createRivalHero();
  createMyHero();
}

initialSetting();

turnBtn.addEventListener('click', function() {
  turn = !turn;
  if (turn) {
    myCost.textContent = 10;
  } else {
    rivalCost.textContent = 10;
  }
  document.getElementById('rival').classList.toggle('turn');
  document.getElementById('my').classList.toggle('turn');
});