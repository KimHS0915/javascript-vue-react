var table = document.getElementById('table');
var data = [];
var score = document.getElementById('score');

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
  if (blankArray.length === 0) {
    alert('GameOver: ' + score.textContent);
    table.innerHTML = '';
    reset();
  } else {
    var randomBox = blankArray[Math.floor(Math.random() * blankArray.length)];
    data[randomBox[0]][randomBox[1]] = 2;
    paint();
  }
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
var dragging = false;
var startCoordinates;
var endCoordinates;

window.addEventListener('mousedown', function(event) {
  startDrag = true;
  startCoordinates = [event.clientX, event.clientY];
});
window.addEventListener('mousemove', function(event) {
  if (startDrag) {
    dragging = true;
  }
});
window.addEventListener('mouseup', function(event) {
  startDrag = false;
  endCoordinates = [event.clientX, event.clientY];
  if (dragging) {
    var direction;
    var xDifference = endCoordinates[0] - startCoordinates[0];
    var yDifference = endCoordinates[1] - startCoordinates[1];
    if (xDifference < 0 && Math.abs(xDifference) / Math.abs(yDifference) > 1) {
      direction = 'left';
    } else if (xDifference > 0 && Math.abs(xDifference) / Math.abs(yDifference) > 1) {
      direction = 'right';
    } else if (yDifference > 0 && Math.abs(xDifference) / Math.abs(yDifference) < 1) {
      direction = 'down';
    } else if (yDifference < 0 && Math.abs(xDifference) / Math.abs(yDifference) < 1) {
      direction = 'up';
    }
    console.log(xDifference, yDifference, direction);
  }
  startDrag = false;
  dragging = false;

  switch (direction) {
    case 'left':
      var newData = [[],[],[],[]];
      data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
          if (rowData) {
            if (newData[i][newData[i].length-1] && newData[i][newData[i].length-1] === rowData) {
              newData[i][newData[i].length-1] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent = currentScore + newData[i][newData[i].length-1];
            } else {
              newData[i].push(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function(colData, i) {
        [1, 2, 3, 4].forEach(function(rowData, j) {
          data[i][j] = newData[i][j] || 0;        
        });
      });
      break;
    case 'right':
      var newData = [[],[],[],[]];
      data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
          if (rowData) {
            if(newData[i][0] && newData[i][0] === rowData) {
              newData[i][0] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent = currentScore + newData[i][0];
            } else {
              newData[i].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function(colData, i) {
        [1, 2, 3, 4].forEach(function(rowData, j) {
          data[i][3-j] = newData[i][j] || 0;        
        });
      });
      break;
    case 'up':
      var newData = [[],[],[],[]];
      data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
          if (rowData) {
            if (newData[j][newData[j].length-1] && newData[j][newData[j].length-1] === rowData) {
              newData[j][newData[j].length-1] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent = currentScore + newData[j][newData[j].length-1];
            } else {
              newData[j].push(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function(rowData, i) {
        [1, 2, 3, 4].forEach(function(colData, j) {
          data[j][i] = newData[i][j] || 0;        
        });
      });
      break;
    case 'down':
      var newData = [[],[],[],[]];
      data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
          if (rowData) {
            if (newData[j][0] && newData[j][0] === rowData) {
              newData[j][0] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent = currentScore + newData[j][0];
            } else {
              newData[j].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function(rowData, i) {
        [1, 2, 3, 4].forEach(function(colData, j) {
          data[3-j][i] = newData[i][j] || 0;        
        });
      });
      break;
  }
  randomCreate();
});
