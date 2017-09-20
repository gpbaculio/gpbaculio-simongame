import './style.css';
import $ from 'jquery';

var audioB        = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    audioG        = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    audioR        = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    audioY        = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    errorAudio    = new Audio('http://www.pacdv.com/sounds/interface_sound_effects/sound16.mp3'),
    applauseAudio = new Audio( 'http://www.pacdv.com/sounds/people_sound_effects/applause-1.wav'),
    redId         = '#red',
    greenId       = '#green',
    yellowId      = '#yellow',
    blueId        = '#blue',
    power         = false, // on = true, off = false
    strict        = false,
    start         = false,
    level         = 0,
    responseInTime = 0,
    playerChallenge,
    playerChallengeResponse;

var Button = function( colorId, audio) {
  this.audio = audio;
  this.lighten = () => {
        var toAnimate = $(colorId);
            toAnimate.addClass("lighten");  
            setTimeout(() => toAnimate.removeClass("lighten"), 700); 
      };
};

var red    = new Button( redId, audioR ),
    green  = new Button( greenId, audioG ),
    yellow = new Button( yellowId, audioY ),
    blue   = new Button( blueId, audioB );

function initialize() {
  setTimeout(function() {
    red.audio.play();
    red.lighten();
  }, 300);
  setTimeout(function() {
    green.audio.play();
    green.lighten();
  }, 600);
  setTimeout(function() {
    yellow.audio.play();
    yellow.lighten();
  }, 900);
  setTimeout(function() {
    blue.audio.play();
    blue.lighten();
  }, 1200);
}



function stopTimer() {
  clearTimeout(responseInTime);
}

function makeChallenge() {
    level+=1;
    if(level === 21) {
      applauseAudio.play()
      $('.level').text('You');
      $('.level').css("color", "green");
      $('.level-text').text('Win!');
      $('.level-text').css("color", "green");
      level = 0;
      start = false;
      strict = false;
      playerChallenge = [];
      return;
    } else {
      $('.level').css({ 'color': '#333' });
      $('.level-text').css({ 'color': '#333' });
    }
    var r = Math.round(Math.random() * 3);
    $('.level').text(level);
    $('.level-text').text('level');
    switch (r) {
      case 0:
        playerChallenge.push(red);
        break;
      case 1:
        playerChallenge.push(green);
        break;
      case 2:
        playerChallenge.push(yellow);
        break;
      case 3:
        playerChallenge.push(blue);
        break;
    }
    setTimeout(function() {
      playChallenge();
    }, 400);
}

function playChallenge() {
  var i = 0;
  var play = setInterval(function() {
    if (power === true) {
      playerChallenge[i].audio.play();
      playerChallenge[i].lighten();
      if (i === playerChallenge.length - 1) {
        clearInterval(play);
        playerChallengeResponse = [];
        timer();
      }
      i++;
    } else if (power === false) {
      clearInterval(play);
    }
  }, 1000);
}

function timer() {
  stopTimer();
  responseInTime = setTimeout(function() {
    if (power === true) {
      $('.level').text('X');
      $( ".level" ).css("color", "red");
      $( ".level" ).css("fontSize", "25px");
      $( ".level" ).css("lineHeight", "50px");
      $('.level-text').text(' ');
      errorAudio.play();
      setTimeout(function() {
        $('.level').text(level);
        $(".level").css({ 'lineHeight' : '', 'color' : '#333', 'fontSize': '14px' });
        $('.level-text').text('level');
      }, 450);
      setTimeout(function() {
          playChallenge();
      }, 300);
    }
  }, 8000);
}

function checkResponse() {
  var correct = 0;
  for (var i = 0; i < playerChallengeResponse.length; i++) {
    if (playerChallenge[i] === playerChallengeResponse[i]) { // check on playerChallenge and playerChallengeResponse relevant index, if this returns true, which means the corresponding playerChallengeResponse is correct, increase correct (adds 1)
      correct++;
    }
  }
  if (correct === playerChallengeResponse.length && playerChallenge.length === playerChallengeResponse.length) { // all player responsee are correct
    setTimeout(function() {
      makeChallenge(); // make challenge, note that we are increasing level each time we invoke makeChallenge()
    }, 400);
  } else if (correct !== playerChallengeResponse.length) { // wrong response, playChallenge again
    $('.level').text('X');
    $( ".level" ).css("color", "red");
    $( ".level" ).css("fontSize", "25px");
    $( ".level" ).css("lineHeight", "50px");
    $('.level-text').text(' ');
    errorAudio.play();
    setTimeout(function() {
      $('.level').text(level);
      $(".level").css({ 'lineHeight' : '', 'color' : '#333', 'fontSize': '14px' });
      $('.level-text').text('level');
    }, 450);
    if (strict === false) {
      setTimeout(function() {
        playChallenge();
      }, 400);
    } else if (strict === true) {
      level = 0;
      playerChallenge = [];
      setTimeout(function() {
        makeChallenge();
      }, 400);
    }
  } else if (correct === playerChallengeResponse.length && playerChallenge.length !== playerChallengeResponse.length) { // all players response are correct but it didn't respond in time
    timer();
  }
}


$(document).ready(function() {
  // display level
  $('.level').text(level);

  //replay button
  $('.replay').click(function() {
    clearTimeout(responseInTime)
    setTimeout(function() {
        playChallenge();
      }, 100);
  })

  // power button
  $('.power').click(function(e) {
    e.preventDefault();
    initialize();
    power = !power;
    if(power === true) {
      $('.power').addClass("active");
    } else {
      start = false;
      strict = false;
      $('.power').removeClass("active");
      $('.start').removeClass("active");
      $('.strict').removeClass("active");
    }
  });

  // start button
  $('.start').click(function(e) {
    stopTimer();
    start = !start;
    if(start === true) {
      $('.start').addClass("active");
    } else {
      $('.start').removeClass("active");
    }
    if (power === true && start === true) {
      level = 0;
      playerChallenge = [];
      makeChallenge();
    }
  });

  // strict button
  $('.strict').click(function() {
    strict = !strict;
    if(strict === true) {
      $('.strict').addClass("active");
    } else {
      $('.strict').removeClass("active");
    }
  });

  $(redId).click(function(e) {
    stopTimer();
    e.preventDefault();
    if (power === true) {
      red.audio.play();
      red.lighten();
      playerChallengeResponse.push(red);
      setTimeout(function() {
        checkResponse();
      }, 200);
    }
  });

  $(greenId).click(function(e) {
    stopTimer();
    e.preventDefault();
    if (power === true) {
      green.audio.play();
      green.lighten();
      playerChallengeResponse.push(green);
      setTimeout(function() {
        checkResponse();
      }, 200);
    }
  });

  $(yellowId).click(function(e) {
    stopTimer();
    e.preventDefault();
    if (power === true) {
      yellow.audio.play();
      yellow.lighten();
      playerChallengeResponse.push(yellow);
      setTimeout(function() {
        checkResponse();
      }, 200);
    }
  });

   $(blueId).click(function(e) {
    stopTimer();
    e.preventDefault();
    if (power === true) {
      blue.audio.play();
      blue.lighten();
      playerChallengeResponse.push(blue);
      setTimeout(function() {
        checkResponse();
      }, 200);
    }
  });
});
