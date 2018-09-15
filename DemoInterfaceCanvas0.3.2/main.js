"use strict";

const web = "http://cosmicmonkeysounds.com/";
const url = web + "DemoInterfaceCanvas0.3/";
const a = url + "audiofiles/";
const b = url + "boofferinterface/";

// Canvas shit---------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->

const c = document.getElementById("boofferCanvas");
const ctx = c.getContext("2d");

window.onload = function() {
  let canvas = [];
  let imgs = [b + "background.png", b + "k2.png", b + "g0.png", b + "t1.png"];

  for (let i = 0; i < imgs.length; i++) {
    var img = new Image();
    canvas.push(img);
    img.onload = function() {
      if (canvas.length >= imgs.length) {
        for (let i = 0; i < canvas.length; i++) {
          ctx.drawImage(canvas[i], 0, 0);
        }
      }
      gainButton.draw();
      toneButton.draw();
    };
    img.src = imgs[i];
  }
};

const Draw = {
  knob: function() {
    let knobImg = new Image();
    knobImg.onload = function() {
      ctx.drawImage(knobImg, 0, 0);
    };
    knobImg.src = b + "k" + String(prevKnobValue) + ".png";
  },

  toggle: function() {
    let led = new Image();
    led.onload = function() {
      ctx.drawImage(led, 0, 0);
      toneButton.draw();
    };
    led.src = b + "led" + String(toggleSelect) + ".png";
  },

  gain: function() {
    let gain = new Image();
    gain.onload = function() {
      ctx.drawImage(gain, 0, 0);
      gainButton.draw();
    };
    gain.src = b + "g" + String(gainSelect) + ".png";
  },

  tone: function() {
    let tone = new Image();
    tone.onload = function() {
      ctx.drawImage(tone, 0, 0);
      toneButton.draw();
    };
    tone.src = b + "t" + String(toneSelect) + ".png";
  }
};

// Button objects------------------------------------------->
//---------------------------------------------------------->

const bypButton = {
  x: 265,
  y: 415,
  radius: 50
};

const gainButton = {
  x: 212,
  y: 190,
  radius: 25,

  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
};

const toneButton = {
  x: 280,
  y: 190,
  radius: 10,
  upper: this.y - this.radius * 2 - 2,
  lower: this.y + this.radius * 2 + 2,

  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y - this.radius * 2 - 2, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y + this.radius * 2 + 2, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
};

// JQ dial-------------------------------------------------->
//---------------------------------------------------------->

$(".dial").knob({
  min: 0,
  max: 4,
  width: 90,
  height: 90,
  displayInput: false,
  fgColor: "#FFFFFF00",
  bgColor: "#FF000000",
  change: function(value) {
    let checkKnob = Math.round(value);
    if (prevKnobValue != checkKnob) {
      prevKnobValue = checkKnob;
      Draw.knob();
      playing ? playClip() : changeClip();
    }
  }
});

// Mouse events--------------------------------------------->
//---------------------------------------------------------->

c.addEventListener(
  "selectstart",
  function(e) {
    e.preventDefault();
    return false;
  },
  false
);

function getMousePos(c, evt) {
  let rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

c.addEventListener("mousedown", function(event) {
  let pos = getMousePos(c, event);
  checkButton(pos.x, pos.y);
});

// UI logic------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->

// Global variables----------------------------------------->
//---------------------------------------------------------->

var prevTime = 0;
var prevKnobValue = 2;
var gainSelect = 0;
var toneSelect = 1;
var toggleSelect = 0;
var cliplist = ["sethFunk", "tjMute", "johnDad"];
var clipName = "sethFunk";
var playing = true;
var playOn = true;

// Button checker------------------------------------------->
//---------------------------------------------------------->

function pythag(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function checkButton(mx, my) {
  //toggle switch
  if (pythag(mx, my, bypButton.x, bypButton.y) < bypButton.radius) {
    toggleSelect ? (toggleSelect = 0) : (toggleSelect = 1);
    Draw.toggle();
    playClip();
  }

  //gain switch
  if (pythag(mx, my, gainButton.x, gainButton.y) < gainButton.radius) {
    gainSelect ? (gainSelect = 0) : (gainSelect = 1);
    Draw.gain();
    playClip();
  }

  //tone switch
  if (
    pythag(mx, my, toneButton.x, toneButton.y - toneButton.radius * 2 - 2) <
    toneButton.radius
  ) {
    toneSelect = 1;
    Draw.tone();
    playClip();
  }

  if (pythag(mx, my, toneButton.x, toneButton.y) < toneButton.radius) {
    toneSelect = 2;
    Draw.tone();
    playClip();
  }

  if (
    pythag(mx, my, toneButton.x, toneButton.y + toneButton.radius * 2 + 2) <
    toneButton.radius
  ) {
    toneSelect = 3;
    Draw.tone();
    playClip();
  }
}

// Audio---------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->
//---------------------------------------------------------->

// Volume slider-------------------------------------------->
//---------------------------------------------------------->

const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.value = 100;

function adjustVolume() {
  song.volume = volumeSlider.value;
}

// Audio object--------------------------------------------->
//---------------------------------------------------------->

const song = new Audio();
song.loop = true;

// Play function-------------------------------------------->
//---------------------------------------------------------->

function playClip() {
  if (playing) {
    prevTime = song.currentTime;
    song.src = changeClip();

    if (playOn) {
      song.volume = volumeSlider.value;
      song.currentTime = prevTime;
      song.load();
      song.play();
    }
  }
}

// Clip selection------------------------------------------->
//---------------------------------------------------------->

function changeClip() {
  return toggleSelect
    ? a +
        clipName +
        "/k" +
        String(prevKnobValue) +
        "_g" +
        String(gainSelect) +
        "_t" +
        String(toneSelect) +
        ".mp3"
    : a + clipName + "/bypass.mp3";
}

function clipSelect(clipNumber) {
  clipName = cliplist[clipNumber];
  prevTime = 0;
  playing = true;
  playClip();
}

// Play/pause----------------------------------------------->
//---------------------------------------------------------->

function playButton() {
  playing
    ? (song.pause(),
      (playing = false),
      (playOn = false),
      (document.getElementById("play").src = url + "Play.png"))
    : ((playing = true),
      (playOn = true),
      playClip(),
      (document.getElementById("play").src = url + "Pause.png"));
}

function checkPlay() {
  if (song.play() !== undefined) {
    song
      .play()
      .then(_ => {})
      .catch(error => {});
  }
}
