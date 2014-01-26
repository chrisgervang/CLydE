var state = 1;
var curtains = 0;
var home = 0;
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
  if ((e.button === 'down') && (home === 0)){
      changeState(0);
    }
  if ((e.button === 'select') && (home === 0))  {
      if (state === 1) {
        home = 1;
        textArr = {title: 'Curtains', subtitle: ' ', body: 'Toggle curtains'};
        simply.text(textArr);
        simply.on('singleClick', function(g) {
          if ((g.button === 'select') && (home === 1)) {
            simply.subtext((curtains+1)%2);
          }
          if (((g.button === 'up') && (home === 1)) || ((g.button === 'down') && (home === 1))) {
            state = 2;
            simply.text(textArr);
            home = 0;
          }
        });
      }
      if (state === 2) {
        textArr = {title: 'Lights', subtitle: ' ', body: 'Toggle lights'};
        simply.text(textArr);
      }
      if (state === 3) {
        textArr = {title: 'Backlight', subtitle: ' ', body: 'Toggle backlight'};
        simply.text(textArr);
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
