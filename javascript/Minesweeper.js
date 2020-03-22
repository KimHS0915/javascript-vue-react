var tbody = document.querySelector('#table tbody');
document.querySelector('#exec').addEventListener('click', function() {
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);
  console.log(hor, ver, mine);

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
  console.log(shuffle);

  var dataset = [];
  for (var i = 0; i < ver; i++) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j = 0; j < hor; j++) {
      arr.push(1); 
      var td = document.createElement('td');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  for (var k = 0; k < shuffle.length; k++) {
    var col = Math.floor(shuffle[k] / 10);
    var row = shuffle[k] % 10;
    console.log(col, row);
    tbody.children[col].children[row].textContent = 'X';
    dataset[col][row] = 'X';
  }
});