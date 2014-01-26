define(['jquery', 'jquery-ui', 'text!views/dashboard.htm', 'less!views/dashboard'], function($, ui, TplDashboard){

    var Dashboard = {

        render: function (){
            $('body').html(TplDashboard);

            var brightnessSlider = $('#brightness-slider'),
            	durationSlider = $('#duration-slider');
            brightnessSlider.slider({
        		min: 1,
        		max: 100,
        		value: 5,

        		slide: function( event, ui ){

      				var percent = brightnessSlider.slider('option', 'value'), 
      					handle = brightnessSlider.find('.ui-slider-handle'), 
      					parent = brightnessSlider.closest('.slider');

      				handle.html(percent + '%');
      				handle.on('mouseleave', function(){
      					setTimeout(function(){
	      					handle.html('');
	      				}, 2000);
      				});

      				if (percent > 30){
      					parent.removeClass('far-right');
      					parent.addClass('far-left');
      				} else {
      					parent.removeClass('far-left');
      					parent.addClass('far-right');
      				}

				}

        	});
        	durationSlider.slider({
        		min: 1,
        		max: 30,
        		value: 27,

        		slide: function( event, ui ){

      				var seconds = durationSlider.slider('option', 'value'), 
      					handle = durationSlider.find('.ui-slider-handle'), 
      					parent = durationSlider.closest('.slider');

      				handle.html(seconds + 's');
      				parent.on('mouseleave', function(){
      					setTimeout(function(){
	      					handle.html('');
	      				}, 2000);
      				});

      				if (seconds > 11){
      					parent.removeClass('far-right');
      					parent.addClass('far-left');
      				} else {
      					parent.removeClass('far-left');
      					parent.addClass('far-right');
      				}

				}
        	});

        	$('.blinds').on('click', function(){
        		$(this).toggleClass('open').toggleClass('closed');
        	});

        	$('.lightswitch').on('click', function(){
        		$(this).toggleClass('on').toggleClass('off');
        	});

        	// comment this out, just showing states. 
        	$('.motion-sensor').on('click', function(){
        		$(this).toggleClass('yes').toggleClass('no');
        	});

        	$('.force-wake').on('click', function(){
        		var that = $(this)
        		that.addClass('clicked');
        		setTimeout(function(){
  					that.removeClass('clicked');
  				}, 400);
        	});
        }
    }

    return Dashboard;

});