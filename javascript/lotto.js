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

var result = document.querySelector('#result');

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
  ball.style.fontWeight = 'bold';
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

for (var i = 0; i < winningNum.length; i++) {
  (function closure(j) {
    setTimeout(function () {
      ballPaint(winningNum[j], result);
    }, (j + 1) * 1000);
  })(i);
}

setTimeout(function asyncCallback() {
  var bonusText = document.querySelector('#bonusText');
  bonusText.textContent = 'Bonus!';
}, 7000);

setTimeout(function asyncCallback() {
  var showBonus = document.querySelector('.showBonus');
  ballPaint(bonus, showBonus);
}, 8000);
