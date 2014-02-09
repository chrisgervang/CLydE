var state = 1;                                                                        //Logical Machine State
var home = 0;                                                                         //Cerent_screen==Home?
var curtains = 0;                                                                     //Whether curtains are drawn (Bool)
var lights = 0;                                                                       //Light Brightness
var backlight = 0;                                                                    //LedLight brightness
var textArr = {title: 'Curtains', subtitle: 'Backlight', body: 'Light'};              //Load print heads
simply.text(textArr);                                                                 //print pre-prepared phrases

var ajax2 = function(opt, success, failure) {
  return ajax(opt, success, failure || function(data, status) {
    simply.subtitle('error: ' + status + ' ' + data);
  });
};

var changeState = function(x) {                                                       //Funct Change current logical state
  state = ((state + x)%3) + 1;                                                        //Complex to alliviate click funtcs
  if (state === 1) {                                                                  //If curtain state
        textArr = {title: 'Curtains', subtitle: 'Light', body: 'Backlight'};          //show appropriate menu
     }  
  if (state === 2) {                                                                  //if Lights state
    textArr = {title: 'Light', subtitle: 'Backlight', body: 'Curtains'};              //""                    ""
     }
  if (state === 3) {                                                                  //If Led lights
      textArr = {title: 'Backlight', subtitle: 'Curtains', body: 'Light'};            //""
     }
  simply.text(textArr);                                                               //print from buffer
  };

simply.on('singleClick', function(e) {                                                //start listening for single clicks  
  if ((e.button === 'up') && (home === 0)) {                                          //If up is pressed from menu
    changeState(1);                                                                   //Find appropriate responses
    } 
  if ((e.button === 'down') && (home === 0)) {                                        //if Button down from menu   
      changeState(0);                                                                 //assume appropriate state
    }
  if ((e.button === 'select') && (home === 1)) {                                      //If select pressed from curtain state
      //toggle curtains

      curtains = (curtains+1)%2; 
      simply.subtitle(curtains);   
      ajax2({ url: 'http://localhost:3000/curtain' }, function(data){
        simply.subtitle(data);
      });                                                     //switcth off between 1 and 0                                                   //print from buffer
    }
  if (((e.button === 'up') && (home === 1)) || ((e.button === 'down') && (home === 1))) { //up or down button from curtains
    state = 1;                                                                        //prepare ffor curtains
    textArr = {title: 'Curtains', subtitle: 'Light', body: 'Backlight'};              //buffer string    
    simply.text(textArr);                                                             //print string
    home = 4;                                                                         //enter temp state to avoid bugs
    }
  if ((e.button === 'up') && (home === 2)) {                                          //If up from lights
    //turn up BULB
    simply.subtitle(++lights);                                                        //disp precentage for lights
    }       
  if ((e.button === 'down') && (home === 2)) {                                     //if down from lights
    //turn down BULB
    simply.subtitle(--lights);                                                        //disp percentages for limits
    }
  if ((e.button === 'select') && (home === 2)) {                                      //select from lights
    state = 2;                                                                        //load state 2
    textArr = {title: 'Light', subtitle: 'Backlight', body: 'Curtains'};              //Back to proper menu
    simply.text(textArr);                                                                   
    home = 4;
    }
  
  if ((e.button === 'up') && (home === 3)) {
    backlight += 20;
    simply.subtitle(backlight);
    ajax2({ url: 'http://localhost:3000/dimLights?params='+backlight+',20,A' }, function(data){
        // var headline = data.match(/<h1>(.*?)<\/h1>/)[1];
        // simply.title(headline);
      });
    //turn up STRIP
    }
  if ((e.button === 'down') && (home === 3)) {
    backlight -= 20;
    //turn down STRIP
    simply.subtitle(backlight);
    ajax2({ url: 'http://localhost:3000/dimLights?params='+backlight+',20,A' }, function(data){

        // var headline = data.match(/<h1>(.*?)<\/h1>/)[1];
        // simply.title(headline);
      });
    }
  if ((e.button === 'select') && (home === 3)) {
    state = 3;
    textArr = {title: 'Backlight', subtitle: 'Curtains', body: 'Light'};
    simply.text(textArr);
    home = 4;
    }


  if ((e.button === 'select') && (home === 0)) {
      if (state === 1) {
        textArr = {title: 'Curtains', subtitle: curtains, body: 'Toggle curtains'};
        simply.text(textArr);
        home = 1;
        }
      if (state === 2) {
        textArr = {title: 'Lights', subtitle: lights, body: 'Toggle lights'};
        simply.text(textArr);
        home = 2;
      }
      if (state === 3) {
        textArr = {title: 'Backlight', subtitle: backlight, body: 'Toggle backlight'};
        simply.text(textArr);
        home = 3;
      }
    }
  if (home === 4) {
    home = 0;
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
