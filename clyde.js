var clicks = 10;  // Amount of click until "time to go!"

simply.body("", true);  // Clears initial screen
simply.title('        CLydE');  // Initialize "CLydE" title
var hour = 8;
var minute = 35;

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
  setInterval(function(){
    minute += 1;
    checkAction();
  },1000);
  