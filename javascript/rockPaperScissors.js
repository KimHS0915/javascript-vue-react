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

document.querySelectorAll('.btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    clearInterval(interval);
    setTimeout(function () {
      intervalMaker();
    }, 1000);
      
    var myChoice = (this.textContent).toLowerCase();
    console.log(comChoice(imgLocation), myChoice);
    if (comChoice(imgLocation) === 'rock') {
      if (myChoice === 'rock') {
        console.log('Draw!');
      } else if (myChoice === 'paper') {
        console.log('Win!');
      } else {
        console.log('Lose!');
      }      
    } else if (comChoice(imgLocation) === 'paper') {
      if (myChoice === 'rock') {
        console.log('Lose!');
      } else if (myChoice ==='paper') {
        console.log('Draw!');
      } else {
        console.log('Win!');
      }
    } else if (comChoice(imgLocation) === 'scissors') {
      if (myChoice === 'rock') {
        console.log('Win!');
      } else if (myChoice === 'paper') {
        console.log('Lose!');
      } else {
        console.log('Draw!');
      }
    }
  });
});
