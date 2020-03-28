var body = document.body;
var table = document.createElement('table');
var rows = [];
var boxes = [];
var turn = 'X';
var result = document.createElement('div');

function check(targetRow, targetBox) {
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
  return complete;
}

function reset() {
  result.textContent = turn + ' Win!';
  turn = 'X';
  boxes.forEach(function (row) {
    row.forEach(function (box) {
      box.textContent = '';
    });
  });
}


var asyncCallback = function (event) {
  if (turn === 'O') {
    return;
  }
  var targetRow = rows.indexOf(event.target.parentNode);
  var targetBox = boxes[targetRow].indexOf(event.target);

  if (boxes[targetRow][targetBox].textContent === '') {
    boxes[targetRow][targetBox].textContent = turn;

    var complete = check(targetRow, targetBox);

    if (complete) {
      reset();
    } else {
      if (turn === 'X') {
        turn = 'O';
      }
      setTimeout(function() {
        console.log('CPU TURN');
        var boxList = [];
        boxes.forEach(function (row) {
          row.forEach(function (box) {
            boxList.push(box);
          });
        });
        boxList = boxList.filter(function (box) {
          return !box.textContent;
        });
        var SelectBox = boxList[Math.floor(Math.random() * boxList.length)];
        SelectBox.textContent = 'O';

        var targetRow = rows.indexOf(SelectBox.parentNode);
        var targetBox = boxes[targetRow].indexOf(SelectBox);
        var complete = check(targetRow, targetBox);

        if (complete) {
          reset();
        }
        turn = 'X';
      }, 1000);
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