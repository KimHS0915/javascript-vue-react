var table = document.getElementById('table');
var data = [];

function reset() {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function() {
    var colData = [];
    data.push(colData);
    var tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(function() {
      colData.push(0);
      var td = document.createElement('td');
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
}

function randomCreate() {
  var blankArray = [];
  data.forEach(function(colData, i) {
    colData.forEach(function(rowData, j) {
      if (!rowData) {
        blankArray.push([i, j]);
      }
    });
  });
  var randomBox = blankArray[Math.floor(Math.random() * blankArray.length)];
  data[randomBox[0]][randomBox[1]] = 2;
  paint();
}

function paint() {
  data.forEach(function(colData, i) {
    colData.forEach(function(rowData, j) {
      if (rowData > 0) {
        table.children[i].children[j].textContent = rowData;
      } else {
        table.children[i].children[j].textContent = '';
      }
    });
  });
}

reset();
randomCreate();
paint();

var startDrag = false;
var startCoordinates;
var endCoordinates;
window.addEventListener('mousedown', function(event) {
  console.log('mousedown', event);
  startDrag = true;
  startCoordinates = [event.clientX, event.clientY];
});
window.addEventListener('mousemove', function(event) {
  if (startDrag) {
    console.log('mousemove', event);
  }
});
window.addEventListener('mouseup', function(event) {
  console.log('mouseup', event);
  startDrag = false;
  endCoordinates = [event.clientX, event.clientY];
});