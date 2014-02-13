define(['jquery', 'jquery-ui', 'text!views/dashboard.htm', 'less!views/dashboard', 'spinningwheel', 'touchwipe'], function($, ui, TplDashboard, lessDashboard, SpinningWheel, touchwipe){

    var Dashboard = {

        render: function (){
            $('body').html(TplDashboard);

            timeSelector.create('time-selector', 'time');

            if (window.navigator.standalone) {
              // $("meta[name='apple-mobile-web-app-status-bar-style']").remove();
            }

            $('.toggle-awake .label').touchwipe({
                wipeRight: function() {
                    $(this).addClass('slide');
                    $('body').toggleClass('awake').toggleClass('sleep');

                    $.get('http://192.168.1.74:3000/goodnight', function() {
                        alert('goodnight!');
                    });
                },
                min_move_x: 20,
                min_move_y: 20,
                preventDefaultEvents: true
            });
        }
    }

    return Dashboard;

});