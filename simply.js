var state = 1;
var home = 0;
var curtains = 0;
var lights = 0;
var backlight = 0;
var textArr = {title: 'Curtains', subtitle: 'Backlight', body: 'Light'};
simply.text(textArr);
simply.style(type = 'large');

var changeState = function(x) {
  state = ((state + x)%3) + 1;
  if (state === 1) {
        textArr = {title: 'Curtains', subtitle: 'Light', body: 'Backlight'};
     }
  if (state === 2) {
    textArr = {title: 'Light', subtitle: 'Backlight', body: 'Curtains'};
     }
  if (state === 3) {
      textArr = {title: 'Backlight', subtitle: 'Curtains', body: 'Light'};
     }
  simply.text(textArr);
  };

simply.on('singleClick', function(e) {
  if ((e.button === 'up') && (home === 0)) {
    changeState(1);
    } 
  if ((e.button === 'down') && (home === 0)) {
      changeState(0);
    }
  if ((e.button === 'select') && (home === 1)) {
      curtains = (curtains+1)%2;
      simply.subtitle(curtains);
    }
  if (((e.button === 'up') && (home === 1)) || ((e.button === 'down') && (home === 1))) {
    state = 1;
    textArr = {title: 'Curtains', subtitle: 'Light', body: 'Backlight'};
    simply.text(textArr);
    home = 0;
    }
  if ((e.button === 'up') && (home === 2)) {
    simply.subtitle(++lights);
    clearInterval(interval);
    }
  if ((e.button === 'down') && (home === 2)) {
    simply.subtitle(--lights);
    clearInterval(interval);
    }
  if ((e.button === 'select') && (home === 2)) {
    state = 2;
    textArr = {title: 'Light', subtitle: 'Backlight', body: 'Curtains'};
    simply.text(textArr);
    home = 0;
    }
  
  if ((e.button === 'up') && (home === 3)) {
    simply.subtitle(++backlight);
    clearInterval(interval);
    }
  if ((e.button === 'down') && (home === 3)) {
    simply.subtitle(--backlight);
    clearInterval(interval);
    }
  if ((e.button === 'select') && (home === 3)) {
    state = 3;
    textArr = {title: 'Backlight', subtitle: 'Curtains', body: 'Light'};
    simply.text(textArr);
    home = 0;
    }
  if ((e.button === 'select') && (home === 0)) {
      if (state === 1) {
        textArr = {title: 'Curtains', subtitle: ' ', body: 'Toggle curtains'};
        simply.text(textArr);
        home = 1;
        }
      if (state === 2) {
        textArr = {title: 'Lights', subtitle: ' ', body: 'Toggle lights'};
        simply.text(textArr);
        home = 2;
      }
      if (state === 3) {
        textArr = {title: 'Backlight', subtitle: ' ', body: 'Toggle backlight'};
        simply.text(textArr);
        home = 3;
      }
    }
});

/*
var count = parseInt(localStorage.getItem('count')) || 0;
var interval;

simply.on('longClick', function(e) {
  if (e.button === 'select') 
    simply.body(" ", true);
});

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    simply.subtitle(++count);
    clearInterval(interval);
  } else if (e.button === 'down') {
    simply.subtitle(--count);
    clearInterval(interval);
  }
  localStorage.setItem('count', count);
});

simply.on('longClick', function(e) {
  if (e.button === 'up') {
    interval = setInterval(function(){simply.subtitle(++count)}, 500);
  } 
  if (e.button === 'down') {
    interval = setInterval(function(){simply.subtitle(--count)}, 500);
  }
    localStorage.setItem('count', count);
});

simply.text({ title: 'Counter', subtitle: count });
*/
