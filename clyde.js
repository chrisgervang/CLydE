var clicks = 6;  // Amount of click until "time to go!"

simply.body("", true);  // Clears initial screen
simply.title('        CLydE');  // Initialize "CLydE" title
var hour = 8;
minute = 35;

var ajax2 = function(opt, success, failure) {
  return ajax(opt, success, failure || function(data, status) {
    simply.subtitle('error: ' + status + ' ' + data);
  });
};

var updateTime = function() {
  if (hour < 10) {  
      if (minute > 9) {
      simply.subtitle("                                   0" + hour + ":" + minute);
      } else {
      simply.subtitle("                                   0" + hour + ":0" + minute);
      }
    } else {
      if (minute > 9) {
      simple.subtitle("                                     " + hour + ":" + minute);
      } else {
      simple.subtitle("                                     " + hour + ":0" + minute);
      }
    }
    return;
};  // updates time maintaining format

var checkAction = function() {
    if (Math.abs(minute - time.getMinutes()) < clicks) {
      updateTime();
    } else {
      simply.subtitle(" it's time to go!");
    }
    return;
};  // Determins whether to update time or announce "Time to go!" 

updateTime();  // Initialize time

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    if(minute === 59) {
      minute = 0;
        if (hour != 12) {
          hour += 1;
        } else {
          hour = 1;
        }
    } else {
      minute += 1;
    }
    checkAction();
  } else if (e.button === 'down') {
    if (minute === 0) {
      minute = 59;
       if (hour != 1) {
          hour -= 1;
        } else {
          hour = 12;
        }
      } else {
        minute -= 1;
      }
    checkAction();
  }
});