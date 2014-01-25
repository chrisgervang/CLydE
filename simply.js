/*
simply.title('Hello World!');

var controller = {};

controller.doSomething = function(x) {
  simply.subtitle(x);
};

return controller;

var config = {
  setting: 'Setting'
};

return config;

controller.doSomething(config.setting);
*/
var count = parseInt(localStorage.getItem('count')) || 0;

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    simply.subtitle(++count);
  } else if (e.button === 'down') {
    simply.subtitle(--count);
  }
  localStorage.setItem('count', count);
});

simply.text({ title: 'Counter', subtitle: count });
