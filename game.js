var buttonColours = ["red","blue","yellow","green"]  
var gamePattern = []
var userClickedPattern = []
var started = false;
var level = 0;



$(document).on("keydown",function(){
    if(!started){
        $("h1").text("Level "+ level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function() {
    userChosenColor = this.id;
    // console.log(userChosenColor)
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})



function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").text("Level "+ level);

    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    buttonColorId = "#" + randomChosenColour;
    $(buttonColorId).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    soundColor = "sounds/" + name + ".mp3"
    var audio = new Audio(soundColor);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000 );
        }
    }
    else{
        
        playSound("wrong");
        $("h1").text("Game Over! Press any Key to start again");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}