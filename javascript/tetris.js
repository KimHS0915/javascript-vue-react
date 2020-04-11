var tetris = document.querySelector('#tetris');
var tetrisData = [];

function CreateBox () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 20; i++) {
    var tr = document.createElement('tr');
    fragment.appendChild(tr);
    for (var j = 0; j < 10; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
    }
  }
  tetris.appendChild(fragment);
}

window.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'ArrowRight':
      break;
    case 'ArrowLeft':
      break;
    case 'ArrowDown':
      break;
    default:
      break;
  }
});

window.addEventListener('keyup', function(event) {
  switch (event.code) {
    case 'Spaece':
      break;
    case 'ArrowUp':
      break;
  }
});

CreateBox();