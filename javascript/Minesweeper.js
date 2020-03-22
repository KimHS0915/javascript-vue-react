var tbody = document.querySelector('#table tbody');
var dataset = [];
document.querySelector('#exec').addEventListener('click', function() {
  tbody.innerHTML = '';
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
      arr.push(1); 
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function (e) {
        e.preventDefault();
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