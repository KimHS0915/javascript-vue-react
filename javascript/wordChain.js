var body = document.body;
var word = document.createElement('div');
word.textContent = 'word';
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var inputWindow = document.createElement('input');
form.append(inputWindow);
var button = document.createElement('button');
button.textContent = 'input!'
form.append(button);
var resultWindow = document.createElement('div');
document.body.append(resultWindow);

form.addEventListener('submit', function callback (event) {
  event.preventDefault();
  if (word.textContent[word.textContent.length - 1] === inputWindow.value[0]) {
    resultWindow.textContent = 'correct';
    word.textContent = inputWindow.value;
    inputWindow.value = '';
    inputWindow.focus();
  } else {
    resultWindow.textContent = 'incorrect';
    inputWindow.value = '';
    inputWindow.focus();
  }
});