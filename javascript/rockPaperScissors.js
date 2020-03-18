var imgLocation = 0;
var rockPaperScissors = {
  rock: '0',
  paper: '-284px',
  scissors: '-142px'
};

function comChoice (imgLocation) {
  return Object.entries(rockPaperScissors).find(function (v) {
    return v[1] === imgLocation;
  })[0];
}

var interval;
function intervalMaker() {
  interval = setInterval(function () {
    if (imgLocation === rockPaperScissors.rock) {
      imgLocation = rockPaperScissors.paper;
    } else if (imgLocation === rockPaperScissors.paper) {
      imgLocation = rockPaperScissors.scissors;
    } else {
      imgLocation = rockPaperScissors.rock;
    }
    document.querySelector('#computer').style.background =
      'url(img/rockPaperScissors.jpg) ' + imgLocation + ' 0';
  }, 100); 
} 

intervalMaker();

var scoreboard = {
  rock: 1,
  paper: 2,
  scissors: 3
}

document.querySelectorAll('.btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    clearInterval(interval);
    setTimeout(function () {
      intervalMaker();
    }, 1000);
      
    var myChoice = (this.textContent).toLowerCase();
    console.log(comChoice(imgLocation), myChoice);
    var score = scoreboard[myChoice] - scoreboard[comChoice(imgLocation)];
    if (score == 0) {
      console.log('Draw');
    } else if ([-2, 1].includes(score)) { // (score == -2 || score == 1)
      console.log('You Win');
    } else {
      console.log('You Lose')
    }
  });
});
