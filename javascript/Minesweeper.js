var tbody = document.querySelector('#table tbody');
var dataset = [];
var stopFlag = false;
var openBox = 0;
document.querySelector('#exec').addEventListener('click', function() {
  tbody.innerHTML = '';
  document.querySelector('#result').textContent = '';
  dataset = [];
  openBox = 0;
  stopFlag = false;
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  var numArray = Array(hor * ver)
    .fill()
    .map(function (element, index) {
      return index;
    });
  var shuffle = [];
  while (numArray.length >  80) {
    var moveValue = numArray.splice(Math.floor(Math.random() * numArray.length), 1)[0];
    shuffle.push(moveValue);
  }

  for (var i = 0; i < ver; i++) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j = 0; j < hor; j++) {
      arr.push(0); 
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        if (stopFlag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
        var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
          e.currentTarget.textContent = '!';
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?';
        } else if (e.currentTarget.textContent === '?') {
          if (dataset[line][box] === 1) {
            e.currentTarget.textContent = '';
          } else if (dataset[line][box] === 'X') {
            e.currentTarget.textContent = 'X';
          }
        }
      });
      td.addEventListener('click', function (e) {
        if (stopFlag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
        var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (dataset[line][box] === 1) {
          return;
        }
        e.currentTarget.classList.add('opened');
        openBox += 1;
        if (dataset[line][box] === 'X') {
          e.currentTarget.textContent = 'B';
          document.querySelector('#result').textContent = 'You Lose';
          stopFlag = true;
        } else {
          dataset[line][box] = 1;
          var around = [dataset[line][box-1], dataset[line][box+1]];
          if (dataset[line-1]) {
            around = around.concat([dataset[line-1][box-1], dataset[line-1][box], dataset[line-1][box+1]]);
          }
          if (dataset[line+1]) {
            around = around.concat([dataset[line+1][box-1], dataset[line+1][box], dataset[line+1][box+1]]);
          }
          CountAroundMine = around.filter(function(v) {
            return v === 'X';
          }).length;
          e.currentTarget.textContent = CountAroundMine || '';
          if (CountAroundMine === 0) {
            var aroundBox = [];
            if (tbody.children[line-1]) {
              aroundBox = aroundBox.concat([
                tbody.children[line-1].children[box-1],
                tbody.children[line-1].children[box],
                tbody.children[line-1].children[box+1],
              ]);
            }
            aroundBox = aroundBox.concat([
              tbody.children[line].children[box-1],
              tbody.children[line].children[box+1],
            ]);

            if (tbody.children[line+1]) {
              aroundBox = aroundBox.concat([
                tbody.children[line+1].children[box-1],
                tbody.children[line+1].children[box],
                tbody.children[line+1].children[box+1],
              ]);
            }
            aroundBox.filter(function (v) { return !!v }).forEach(function(nextBox) {
              var parentTr = e.currentTarget.parentNode;
              var parentTbody = e.currentTarget.parentNode.parentNode;
              var nextBoxBox = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
              var NextBoxLine = Array.prototype.indexOf.call(parentTbody.children, parentTr);
              if (dataset[NextBoxLine][nextBoxBox] === 1){
                nextBox.click();
              }
            });
          }
        }
        if (openBox === hor * ver - mine) {
          stopFlag = true;
          document.querySelector('#result').textContent = 'You Win';
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  for (var k = 0; k < shuffle.length; k++) {
    var col = Math.floor(shuffle[k] / 10);
    var row = shuffle[k] % 10;
    tbody.children[col].children[row].textContent = 'X';
    dataset[col][row] = 'X';
  }
});