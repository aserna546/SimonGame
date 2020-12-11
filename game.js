var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNuber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNuber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).css({
        opacity: 0
    });
    $("#" + randomChosenColour).animate({
        opacity: 1
    }, 500);
    playSound(randomChosenColour);

    return randomNuber;
}


$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function () {
    if (level == 0) {
        nextSequence();
    }
});

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
    return;
}

function startOver() {
    level = 0;
    gamePattern = [];
}