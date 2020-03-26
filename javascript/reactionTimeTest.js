var screen = document.querySelector('#screen');
var startTime;
var endTime;

screen.addEventListener('click', function() {
  if (screen.classList.contains('waiting')) {
    screen.classList.remove('waiting');
    screen.classList.add('ready');
    screen.textContent = 'Wait for green';
    setTimeout(function() {
      startTime = new Date();
      screen.click();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (screen.classList.contains('ready')) {
    screen.classList.remove('ready');
    screen.classList.add('now');
    screen.textContent = 'Click!';
  } else if (screen.classList.contains('now')) {
    endTime = new Date();
    console.log((endTime-startTime))
    screen.classList.remove('now');
    screen.classList.add('waiting');
    screen.textContent = 'Click anywhere to start';
  }
});