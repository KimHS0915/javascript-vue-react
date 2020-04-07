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

reset();