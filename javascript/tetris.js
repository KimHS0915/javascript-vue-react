var tetris = document.querySelector('#tetris');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3];
var blocks = [
  {
    name: 's',
    center: false,
    numCode: 1,
    color: 'pink',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't',
    center: true,
    numCode: 2,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: 'z',
    center: true,
    numCode: 3,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: 'zr',
    center: true,
    numCode: 4,
    color: 'darkblue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  {
    name: 'l',
    center: true,
    numCode: 5,
    color: 'darkgreen',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: 'lr',
    center: true,
    numCode: 6,
    color: 'green',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: 'b',
    center: true,
    numCode: 7,
    color: 'purple',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
]

const colors = ['pink', 'red', 'blue', 'darkblue', 'darkgreen', 'green', 'purplr']
const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach((col, i) => {
    const tr = document.createElement('tr');
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((row, j) => {
      const td = document.createElement('td');
      tr.appendChild(td);
    });
    const column = Array(10).fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}

function draw() {
  tetrisData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row > 0) {
        tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10 -1]: colors[tetrisData[i][j] -1]
      } else {
        tetris.children[i].children[j].className = '';
      }
    });
  });
}

function drawNext() {
  const nextTable = document.getElementById('next-table');
  nextTable.querySelectorAll('tr').forEach((col, i) => {
    Array.from(col.children).forEach((row, j) => {
      if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
        nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
      } else {
        nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
      }
    });
  });
}

function generate() {
  if (!currentBlock) {
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  } else {
    currentBlock = nextBlock;
  }
  currentBlock.currentShapeIndex = 0;
  nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
  drawNext();
  currentTopLeft = [-1, 3];
  let isGameOver = false;
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row && tetrisData[i][j+3]) {
        isGameOver = true;
      }
    });
  });
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][j+3] = currentBlock.numCode;
      }
    });
  });
  if (isGameOver) {
    clearInterval(int);
    draw();
    alert('GameOver');    
  } else {
    draw();
  }
}

function checkrows() {
  const fullRows = [];
  tetrisData.forEach((col, i) => {
    let count = 0;
    col.forEach((row, j) => {
      if (row > 0) {
        count++;
      }
    });
    if (count === 10) {
      fullRows.push(i);
    }
  });
  const fullRowsCount = fullRows.length;
  tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));
  for (let i = 0; i < fullRowsCount; i++) {
    tetrisData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  let score = parseInt(document.getElementById('score').textContent, 10);
  score += fullRows ** 2;
  document.getElementById('score').textContent = String(score);
}

function tick() {
  const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
  const activeBlock = [];
  let canGoDown = true;
  let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
  for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
    if (i < 0 || i >= 20) continue;
    for (let j = currentTopLeft; j < currentTopLeft[1] + currentBlockShape.length; j++) {
      if (isActiveBlock(tetrisData[i][j])) {
        activeBlock.push([i, j]);
        if (isInvalidBlock(tetrisData[i+1] && tetrisData[i +1][j])) {
          canGoDown = false;
        }
      }
    }
  }
  if (!canGoDown) {
    activeBlock.forEach((blocks) => {
      tetrisData[blocks[0]][blocks[1]] += 10;
    });
    checkRows();
    generate();
    return false;
  } else if (canGoDown) {
    for (let i = tetrisData.length - 1; i >= 0; i--) {
      const col = tetrisData[i];
      col.forEach((row, j) => {
        if (row < 10 && tetrisData[i+1] && tetrisData[i+1][j] < 10) {
          tetrisData[i+1][j] =row;
          tetrisData[i][j] = 0;
        }
      });
    }
    currentTopLeft = nextTopLeft;
    draw();
    return true;
  }
}

let int = setInterval(tick, 2000);

init();
generate();












