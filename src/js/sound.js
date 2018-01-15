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

const backgroundSound = new Howl({
  src: ["../../Assets/Sounds/sound4.mp3"],
  autoplay: true,
  loop: true,
});

const sounds = [soundOne, soundTwo, soundThree, soundFour];

function stopSound() {
  sounds.forEach(sound => {
    sound.stop();
  });
}
let indexTemp = 0;
let playing = false;
function changeSound(index) {
  stopSound();
  indexTemp = index - 1;
  sounds[indexTemp].play();
  if (!playing) icon.toggleClass('active');

  playing = true;

}

$("[type=range]").change(function () {
  var index = $(this).val();
  changeSound(parseInt(index));
});

$(".range-labels li").on("click", function () {
  var index = $(this).index() + 1;
  changeSound(index);
});

sounds.forEach(sound => {
  sound.on('end', function () {
    icon.toggleClass('active');
    playing = false;
  });
})



function soundState() {
  if (playing) {
    sounds[indexTemp].pause();
    playing = false;
  } else {
    if (indexTemp) {
      sounds[indexTemp].play();
    } else {
      sounds[0].play();
      indexTemp = 0;
    }

    playing = true;
  }
}

let playingBackground = true;

function soundStateBackground() {
  if (playingBackground) backgroundSound.pause();
  else backgroundSound.play();
  playingBackground = !playingBackground;
  changeButtonBackground();
}

