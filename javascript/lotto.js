var numArray = Array(45).fill().map(function(element, index) {
  return index + 1;
});

var shuffle = [];
while (numArray.length > 0) {
  var moveValue = numArray.splice(Math.floor(Math.random() * numArray.length), 1)[0];
  shuffle.push(moveValue);
}

var bonus = shuffle[shuffle.length - 1];
var winningNum = shuffle.slice(0, 6).sort(function (p, c) {
  return p - c;
});

var result = document.getElementById('result');

function ballPaint(num, result) {
  var ball = document.createElement('div');
  ball.textContent = num;
  ball.style.display = 'inline-block';
  ball.style.border = '1px solid black';
  ball.style.borderRadius = '10px';
  ball.style.width = '20px';
  ball.style.height = '20px';
  ball.style.textAlign = 'center';
  ball.style.marginRight = '10px';
  ball.style.fontSize = '12px';
  ball.className = 'ballID' + num;
  var backgroundColor;
  if (num <= 10 ) {
    backgroundColor = 'red';
  } else if (num <= 20 ) {
    backgroundColor = 'orange';
  } else if (num <= 30 ) {
    backgroundColor = 'yellow';
  } else if (num <= 40 ) {
    backgroundColor = 'blue';
  } else {
    backgroundColor = 'green';
  }
  ball.style.background = backgroundColor;
  result.appendChild(ball);
}

setTimeout(function asyncCallback() {
  ballPaint(winningNum[0], result);
}, 1000);
setTimeout(function asyncCallback() {
  ballPaint(winningNum[1], result);
}, 2000);
setTimeout(function asyncCallback() {
  ballPaint(winningNum[2], result);
}, 3000);
setTimeout(function asyncCallback() {
  ballPaint(winningNum[3], result);
}, 4000);
setTimeout(function asyncCallback() {
  ballPaint(winningNum[4], result);
}, 5000);
setTimeout(function asyncCallback() {
  ballPaint(winningNum[5], result);
}, 6000);


setTimeout(function asyncCallback() {
  var showBonus = document.getElementsByClassName('showBonus')[0];
  var bonusBall = document.createElement('div');
  bonusBall.textContent = bonus;
  showBonus.appendChild(bonusBall);
}, 7000);
