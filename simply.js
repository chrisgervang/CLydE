
var count = parseInt(localStorage.getItem('count')) || 0;

simply.on('longClick', function(e) {
  if (e.button === 'select') 
    simply.body(text, clear);
});

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    simply.subtitle(++count);
  } else if (e.button === 'down') {
    simply.subtitle(--count);
  }
  localStorage.setItem('count', count);
});

simply.on('longClick', function(e) {
  if (e.button === 'up') {
      simply.subtitle(++count);
  } else if (e.button === 'down') {
    simply.subtitle(--count);
  }
    localStorage.setItem('count'), count);
});

simply.text({ title: 'Counter', subtitle: count });
