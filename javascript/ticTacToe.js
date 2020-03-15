var body = document.body;
var table = document.createElement('table');
var rows = [];
var boxes = [];
var turn = 'X';
var result = document.createElement('div');

var asyncCallback = function (event) {
  var targetRow = rows.indexOf(event.target.parentNode);
  var targetBox = boxes[targetRow].indexOf(event.target);

  if (boxes[targetRow][targetBox].textContent === '') {
    boxes[targetRow][targetBox].textContent = turn;
    var complete = false;
    if (boxes[targetRow][0].textContent === turn && boxes[targetRow][1].textContent === turn && boxes[targetRow][2].textContent === turn) {
      complete = true;
    }
    if (boxes[0][targetBox].textContent === turn && boxes[1][targetBox].textContent === turn && boxes[2][targetBox].textContent === turn) {
      complete = true;
    }
    if (
      (boxes[0][0].textContent === turn && boxes[1][1].textContent === turn && boxes[2][2].textContent === turn) ||
      (boxes[0][2].textContent === turn && boxes[1][1].textContent === turn && boxes[2][0].textContent === turn)
    ) {
      complete = true;
    }

    if (complete) {
      result.textContent = turn + ' Win!';
      turn = 'X';
      boxes.forEach(function (row) {
        row.forEach(function (box) {
          box.textContent = '';
        })
      })
     
    } else {
      if (turn === 'X') {
        turn = 'O';
      } else {
        turn = 'X';
      }
    }
  }
};

for (var i = 1; i <= 3; i++) {
  var row = document.createElement('tr');
  rows.push(row);
  boxes.push([]);
  for (var j = 1; j <=3; j++) {
    var box = document.createElement('td');
    box.addEventListener('click', asyncCallback);
    boxes[i - 1].push(box);
    row.appendChild(box);
  }
  table.appendChild(row);
}
body.appendChild(table);
body.appendChild(result);