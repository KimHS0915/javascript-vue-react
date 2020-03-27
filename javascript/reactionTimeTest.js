var screen = document.querySelector('#screen');
var startTime;
var endTime;
var record = [];
var timeout;

screen.addEventListener('click', function() {
  if (screen.classList.contains('waiting')) {
    screen.classList.remove('waiting');
    screen.classList.add('ready');
    screen.textContent = 'Wait for green';
    timeout = setTimeout(function() {
      startTime = new Date();
      screen.click();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (screen.classList.contains('ready')) {
    if (!startTime) {
      clearTimeout(timeout);
      screen.classList.remove('ready');
      screen.classList.add('waiting');
      screen.textContent = 'Too soon! Click to try again';
    } else {
      screen.classList.remove('ready');
      screen.classList.add('now');
      screen.textContent = 'Click!';
    }
  } else if (screen.classList.contains('now')) {
    endTime = new Date();
    console.log((endTime-startTime));
    record.push(endTime - startTime);
    startTime = null;
    endTime = null;
    screen.classList.remove('now');
    screen.classList.add('waiting');
    screen.textContent = 'Click anywhere to start';
  }
});