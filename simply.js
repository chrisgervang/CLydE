var count = parseInt(localStorage.getItem('count')) || 0;


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
    var interval = setInterval(function(){simply.subtitle(++count)}, 500);
  } 
  if (e.button === 'down') {
    var interval = setInterval(function(){simply.subtitle(--count)}, 500);
  }
    localStorage.setItem('count', count);
});

simply.text({ title: 'Counter', subtitle: count });
