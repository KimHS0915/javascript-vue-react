var screen = document.querySelector('#screen');

screen.addEventListener('click', function() {
  if (screen.classList.contains('waiting')) {
    screen.classList.remove('waiting');
    screen.classList.add('ready');
    screen.textContent = 'Wait for green';
  } else if (screen.classList.contains('ready')) {
    screen.classList.remove('ready');
    screen.classList.add('now');
    screen.textContent = 'Click!';
  } else if (screen.classList.contains('now')) {
    screen.classList.remove('now');
    screen.classList.add('waiting');
    screen.textContent = 'Click anywhere to start';
  }
});