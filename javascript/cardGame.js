var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;

function createRivalDeck(num) {
  for (var i = 0; i < num; i++) {
    rivalDeckData.push(cardFactory());
  }
  rivalDeckData.forEach(function(data) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    rivalDeck.appendChild(card);
  });
}

function createMyDeck(num) {
  for (var i = 0; i < num; i++) {
    myDeckData.push(cardFactory());
  }
  myDeckData.forEach(function(data) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    myDeck.appendChild(card);
  });  
}

function createRivalHero() {
  rivalHeroData = cardFactory(true);
  var card = document.querySelector('.card-hidden .card').cloneNode(true);
  card.querySelector('.card-att').textContent = rivalHeroData.att;
  card.querySelector('.card-hp').textContent = rivalHeroData.hp;
  rivalHero.appendChild(card);
}

function createMyHero() {
  myHeroData = cardFactory(true);
  var card = document.querySelector('.card-hidden .card').cloneNode(true);
  card.querySelector('.card-att').textContent = myHeroData.att;
  card.querySelector('.card-hp').textContent = myHeroData.hp;
  myHero.appendChild(card);
}

function initialSetting() {
  createRivalDeck(5);
  createMyDeck(5);
  createRivalHero();
  createMyHero();
}

function Card() {
  this.att = Math.ceil(Math.random() * 5);
  this.hp = Math.ceil(Math.random() * 5);
  this.cost = Math.floor(this.att + this.hp) / 2;
}
function HeroCard() {
  this.att = Math.ceil(Math.random() * 2);
  this.hp = Math.ceil(Math.random() * 5) + 15;
  this.hero = true;
}
function cardFactory(hero) {
  if (hero) {
    return new HeroCard();
  } else {
    return new Card();
  }
}

initialSetting();