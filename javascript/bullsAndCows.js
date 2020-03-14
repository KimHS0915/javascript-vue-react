var body = document.body;
var numList;
var numArray;

function makeNumArray() {
  numList = [1,2,3,4,5,6,7,8,9];
  numArray = [];
  for (var i = 0; i< 4; i += 1) {
    var n = numList.splice(Math.floor(Math.random() * numList.length), 1)[0];
    numArray.push(n);
  } 
}

makeNumArray();
console.log(numArray);

var result = document.createElement('h1');
body.append(result)
var form = document.createElement('form');
document.body.append(form);
var inputWindow = document.createElement('input');
inputWindow.type = 'text';
inputWindow.maxLength = 4;
form.append(inputWindow);
var button = document.createElement('button');
button.textContent = 'input!';
form.append(button);

var count = 0;
form.addEventListener('submit', function callback (event) {
  event.preventDefault();
  var answer = inputWindow.value;
  if (answer === numArray.join('')) {
    result.textContent = 'You Win!';
    inputWindow.value = '';
    inputWindow.focus();
    makeNumArray();
    count = 0;
  } else {
    var answerArray = answer.split('');
    var bulls = 0;
    var cows = 0;
    count += 1;
    if (count > 10) {
      result.textContent = "Game Over! answer : " + numArray.join('')
      inputWindow = ''
      inputWindow.focus();
      makeNumArray();
      count = 0;
    } else {
      for (var i = 0; i < 4; i += 1) {
        if (Number(answerArray[i]) === numArray[i]) {
          bulls += 1;
        } else if (numArray.indexOf(Number(answerArray[i])) > -1) {
          cows += 1;
        }
      }
      result.textContent = bulls + ' Bulls ' + cows + ' Cows';
      inputWindow.value = '';
      inputWindow.focus();
    }
  }
});