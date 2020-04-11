var tetris = document.querySelector('#tetris');
var blockArr = [
  ['pink', true, [
    [1, 1],
    [1, 1],
  ]],
  ['red', true, [
    [0, 2, 0],
    [2, 2, 2],
  ]],
  ['blue', true, [
    [3, 3, 0],
    [0, 3, 3],
  ]],
  ['darkblue', true, [
    [0, 4, 4],
    [4, 4, 0],
  ]],
  ['darkgreen', true, [
    [5, 5, 5],
    [5, 0, 0],
  ]],
  ['green', true, [
    [6, 6, 6],
    [0, 0, 6],
  ]],
  ['purple', true, [
    [7, 7, 7, 7],
  ]],
];
var blockDict = {
  0: ['white', false, []],
  1: ['pink', true, [
    [1, 1],
    [1, 1],
  ]],
  2: ['red', true, [
    [0, 1, 0],
    [1, 1, 1],
  ]],
  3: ['blue', true, [
    [1, 1, 0],
    [0, 1, 1],
  ]],
  4: ['darkblue', true, [
    [0, 1, 1],
    [1, 1, 0],
  ]],
  5: ['darkgreen', true, [
    [1, 1, 1],
    [1, 0, 0],
  ]],
  6: ['green', true, [
    [1, 1, 1],
    [0, 0, 1],
  ]],
  7: ['purple', true, [
    [1, 1, 1, 1],
  ]],
  11: ['pink', false, []],
  12: ['red', false, []],
  13: ['blue', false, []],
  14: ['darkblue', false, []],
  15: ['darkgreen', false, []],
  16: ['green', false, []],
  17: ['pink', false, []],
}
var tetrisData = [];

function createBox () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 20; i++) {
    var tr = document.createElement('tr');
    var arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);
    for (var j = 0; j < 10; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      arr.push(0);
    }
  }
  console.log(tetrisData);
  tetris.appendChild(fragment);
}

function paintDisplay() {
  tetrisData.forEach(function(tr, i) {
    tr.forEach(function(td, j) {
      tetris.children[i].children[j].className = blockDict[td][0];
    });
  });
}

function createBlock() {
  var block = blockArr[Math.floor(Math.random() * 7)][2];
  console.log(block);
  block.forEach(function(tr, i) {
    tr.forEach(function(td, j) {
      tetrisData[i][j + 3] = td;
    });
  });
  paintDisplay();
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

createBox();
createBlock();