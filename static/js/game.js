var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 1

$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level)
    nextSequence()
    started = true
    }
  }
)

$(".btn").on("click", function (event){
  if (started){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    animate_press(userChosenColour)
    play_sound(userChosenColour)
    checkAnswer()
  }
})

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
  play_sound(randomChosenColour)
}

function play_sound(button_color) {
  var sound_file_path = "static/sounds/" + button_color + ".mp3"
  var audio = new Audio(sound_file_path);
  audio.play();
}

function animate_press(currentColour) {
  var current_button = $("#" + currentColour)
  current_button.addClass("pressed")
  setTimeout(function (){current_button.removeClass("pressed")}, 100)
}

function checkAnswer() {
  var currentLevel = userClickedPattern.length - 1
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000)
      userClickedPattern = []
      level += 1
      $("#level-title").text("Level " + level)
    }
  } else {
    var body_obj = $("body")
    body_obj.addClass("game-over")
    setTimeout(function (){body_obj.removeClass("game-over")}, 200)
    var sound_file_path = "static/sounds/wrong.mp3"
    var audio = new Audio(sound_file_path);
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart")
    started = false
    level = 1
    userClickedPattern = []
    gamePattern = []
    return
  }
}
