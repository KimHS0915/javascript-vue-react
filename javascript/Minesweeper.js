var tbody = document.querySelector('#table tbody');
var dataset = [];
var stopFlag = false;
var openBox = 0;
var codeDict = {
  openBox: -1,
  question: -2,
  flag: -3,
  flagMine: -4,
  questionMine: -5,
  mine: 1,
  normalBox: 0,
};
var startTime;
var endTime;

document.querySelector('#exec').addEventListener('click', function() {
  document.querySelector('#timeCheck').textContent = ''
  startTime = new Date();
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
  while (numArray.length >  hor * ver - mine) {
    var moveValue = numArray.splice(Math.floor(Math.random() * numArray.length), 1)[0];
    shuffle.push(moveValue);
  }

  for (var i = 0; i < ver; i++) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j = 0; j < hor; j++) {
      arr.push(codeDict.normalBox); 
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
          e.currentTarget.classList.add('flag');
          if (dataset[line][box] === codeDict.mine) {
            dataset[line][box] = codeDict.flagMine;
          } else {
            dataset[line][box] = codeDict.flag;
          }
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?';
          e.currentTarget.classList.remove('flag');
          e.currentTarget.classList.add('question');
          if (dataset[line][box] === codeDict.flagMine) {
            dataset[line][box] = codeDict.questionMine;
          } else {
            dataset[line][box] = codeDict.question;
          }
        } else if (e.currentTarget.textContent === '?') {
          e.currentTarget.classList.remove('question');
          if (dataset[line][box] === codeDict.questionMine) {
            e.currentTarget.textContent = 'X';
            dataset[line][box] = codeDict.mine;
          } else {
            e.currentTarget.textContent = '';
            dataset[line][box] = codeDict.normalBox;
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
        if ([codeDict.openBox, codeDict.flag, codeDict.flagMine, codeDict.questionMine, codeDict.question].includes(dataset[line][box])) {
          return;
        }
        e.currentTarget.classList.add('opened');
        openBox += 1;
        if (dataset[line][box] === codeDict.mine) {
          e.currentTarget.textContent = 'B';
          document.querySelector('#result').textContent = 'You Lose';
          endTime = new Date();
          document.querySelector('#timeCheck').textContent = (endTime - startTime) / 1000 + ' sec'
          stopFlag = true;
        } else {
          var around = [dataset[line][box-1], dataset[line][box+1]];
          if (dataset[line-1]) {
            around = around.concat([dataset[line-1][box-1], dataset[line-1][box], dataset[line-1][box+1]]);
          }
          if (dataset[line+1]) {
            around = around.concat([dataset[line+1][box-1], dataset[line+1][box], dataset[line+1][box+1]]);
          }
          CountAroundMine = around.filter(function(v) {
            return v === codeDict.mine;
          }).length;
          e.currentTarget.textContent = CountAroundMine || '';
          dataset[line][box] = codeDict.openBox;
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
              if (dataset[NextBoxLine][nextBoxBox] === codeDict.openBox){
                nextBox.click();
              }
            });
          }
        }
        if (openBox === hor * ver - mine) {
          stopFlag = true;
          endTime = new Date();
          document.querySelector('#timeCheck').textContent = (endTime - startTime) / 1000 + ' sec'
          document.querySelector('#result').textContent = 'You Win';
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  for (var k = 0; k < shuffle.length; k++) {
    var col = Math.floor(shuffle[k] / ver);
    var row = shuffle[k] % ver;
    tbody.children[col].children[row].textContent = 'X';
    dataset[col][row] = codeDict.mine;
  }
});