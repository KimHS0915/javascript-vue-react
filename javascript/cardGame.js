var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalDeckData = [];
var myDeckData = [];
var rivalHero;
var myHero;

function createRivalDeck(num) {
  for (var i = 0; i < num; i++) {
    rivalDeckData.push(cardFactory());
  }  
}

function createMyDeck(num) {
  for (var i = 0; i < num; i++) {
    myDeckData.push(cardFactory());
  }  
}

function createRivalHero() {
  cardFactory();
}

function createMyHero() {
  cardFactory();
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

function cardFactory() {
  return new Card();
}

initialSetting();