
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var userChosenColour = "white";

var started = false;
var level = 0;
var bestScore=0;

$(document).keypress(function(e) {
  if (!started && e.which==13) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  else if(started && e.key==="w"){
    // userType(e.key);
    userChosenColour = "green";
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
  else if(started && e.key==="a"){
    userChosenColour = "red";
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
  else if(started && e.key==="d"){
    userChosenColour = "yellow";
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
  else if(started && e.key==="s"){
    userChosenColour = "blue";
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
});



function userType(key) {

  switch (key) {
    case "w":
      userChosenColour = "green";
      break;

    case "a":
      userChosenColour = "red";
      break;

    case "s":
      userChosenColour = "yellow";
      break;

    case "d":
      userChosenColour = "blue";
      break;

    deafault: userChosenColour = "white";
    ;
  }
}

$(document).keypress(function(event) {
  userType(event.key);


  userClickedPattern.push(press);
  buttonAnimation(event.key);

});

$(".btn").click(function() {

  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Enter to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  bestScore=(Math.max(level+1,bestScore));
  level++;
  $("#high").text("heighest Score: " + bestScore);
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
