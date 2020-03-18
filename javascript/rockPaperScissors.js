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

var message = document.querySelector("#message")
message.textContent = 'Push the button'

var win = 0;
var draw = 0;
var lose = 0;

var record = document.querySelector("#record");
record.textContent = `Win : ${win}, Draw : ${draw}, Lose : ${lose}`;

document.querySelectorAll('.btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    clearInterval(interval);
    setTimeout(function () {
      intervalMaker();
    }, 1000);
      
    var myChoice = (this.textContent).toLowerCase();
    var score = scoreboard[myChoice] - scoreboard[comChoice(imgLocation)];
    if (score == 0) {
      message.textContent = 'Draw'
      draw += 1
    } else if ([-2, 1].includes(score)) { // (score == -2 || score == 1)
      message.textContent = 'You Win'
      win += 1
    } else {
      message.textContent = 'You Lose'
      lose += 1
    }
    record.textContent = `Win : ${win}, Draw : ${draw}, Lose : ${lose}`;
  });
});
