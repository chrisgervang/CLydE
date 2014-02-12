var clicks = 10;  // Amount of click until "time to go!"

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

ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
  simply.subtitle("                                   0" + hour + ":36");
  
  ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
    simply.subtitle("                                   0" + hour + ":37");
    
    ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
      simply.subtitle("                                   0" + hour + ":38");
      
      ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
        simply.subtitle("                                   0" + hour + ":39");

        ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
          simply.subtitle("                                   0" + hour + ":40");

          ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
            simply.subtitle("                                   0" + hour + ":41");

            ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
              simply.subtitle("                                   0" + hour + ":42");

              ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
                      simply.subtitle("                                   0" + hour + ":43");

                ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
                        simply.subtitle("                                   0" + hour + ":44");

                  ajax2({ url: 'http://192.168.1.74:3000/second' }, function(data){
                          simply.subtitle("                                   0" + hour + ":45");

                  });
                });
              });
            });
          });
        });
      });
});
});
});
