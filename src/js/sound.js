const soundOne = new Howl({
  src: ["../../Assets/Sounds/sound.mp3"]
});
const soundTwo = new Howl({
  src: ["../../Assets/Sounds/sound2.mp3"]
});
const soundThree = new Howl({
  src: ["../../Assets/Sounds/sound3.mp3"]
});
const soundFour = new Howl({
  src: ["../../Assets/Sounds/sound4.mp3"]
});

const sounds = [soundOne, soundTwo, soundThree, soundFour];

function stopSound() {
  sounds.forEach(sound => {
    sound.stop();
  });
}
let indexTemp;
let playing = false;
function changeSound(index) {
  stopSound();
  indexTemp = index - 1;
  sounds[indexTemp].play();
  playing = true;
  $(".btn").text("pause");
}

$("[type=range]").change(function() {
  var index = $(this).val();
  changeSound(parseInt(index));
});

$(".range-labels li").on("click", function() {
  var index = $(this).index() + 1;
  changeSound(index);
});

function soundState() {
  if (playing) {
    sounds[indexTemp].pause();
    playing = false;
    $(".btn").text("play");
  } else {   
    if (indexTemp){
      sounds[indexTemp].play();
    }else{
      sounds[0].play();
      indexTemp=0;    
    }  
    $(".btn").text("pause");
      playing = true;  
  }
}


