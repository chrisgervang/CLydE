var state = 0;
var textArr = {title: 'Canoe', body: 'Boat', body: 'Ship', body: state};
simply.text(textArr);

var changeState = function(x) {
  state = state + x;
  if (state === 0){
    textArr = {title: 'Canoe', body: 'Boat', body: 'Ship', body: state};
   } else if (state === 1) {
      textArr = {body: 'Canoe', title: 'Boat', body: 'Ship', body: state};
     } else if (state === 2) {
        textArr = {body: 'Canoe', body: 'Boat', title: 'Ship', body: state};
     }
  simply.text(textArr);
  };

simply.on('singleClick', function(e) {
  if (e.button === 'up') 
    if (state>0)
      changeState(-1);
      else if (e.button === 'down') 
        if (state<2)
          changeState(1);
          else if (e.button === 'select') {
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
