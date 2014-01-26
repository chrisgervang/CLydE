var state = 1;
var textArr = {title: 'Canoe', subtitle: 'Boat', body: 'Ship'};
simply.text(textArr);
simply.style(type = 'mono');

var changeState = function(x) {
  state = (state + x)%3;
  if (state === 1) {
    textArr = {title: 'Ship', subtitle: 'Boat', body: 'Canoe'};
     }
  if (state === 2) {
      textArr = {title: 'Boat', subtitle: 'Canoe', body: 'Ship'};
     }
  if (state === 3) {
        textArr = {title: 'Canoe', subtitle: 'Ship', body: 'Boat'};
     }
  simply.text(textArr);
  };

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    changeState(2);
    } 
  if (e.button === 'down') {
      changeState(1);
    }
  if (e.button === 'select') {
      
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
