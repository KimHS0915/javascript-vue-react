var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var result = num1 * num2;

var body = document.body;
var word = document.createElement('div');
word.textContent = String(num1) + ' X ' + String(num2) + '= ?';
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var inputWindow = document.createElement('input');
inputWindow.type = 'number';
form.append(inputWindow);
var button = document.createElement('button');
button.textContent = 'input!';
form.append(button);
var resultWindow = document.createElement('div');
document.body.append(resultWindow);

form.addEventListener('submit', function callback (event) {
  event.preventDefault();
  if (result === Number(inputWindow.value)) {
    resultWindow.textContent = 'correct';
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    result = num1 * num2;
    word.textContent = String(num1) + ' X ' + String(num2) + '= ?';
    inputWindow.value = '';
    inputWindow.focus();
  } else {
    resultWindow.textContent = 'incorrect'; 
    inputWindow.value = '';
    inputWindow.focus();
  }
});
  