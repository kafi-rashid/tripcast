jQuery(document).ready(function(){

	// NAVBAR
	$('#menu-item li a').on('click', function() {
		$('#menu-item li a').removeClass('active');
		$(this).addClass('active');
	});

	// CLOUDS
	var cloud_xpos = -100;
	$(window).on("load resize", function(e) {
		var header_content_w = document.getElementById('header-content').offsetWidth;
		$('#header-content').css({
			'left': '50%',
			'margin-left': -(header_content_w / 2) + 'px'
		})
		cloud_xpos = -($(window).width() / 10);
	});
	var cloud_scroll = 0;
	setInterval(function() {
		cloud_scroll -= 1;
		$('#header-foreground').css('background-position', cloud_scroll + 'px ' + cloud_xpos + 'px');
	}, 40);

	// CENTER ELEMENTS
	$('.hc-content').each(function() {
		$(this).css({ 'top': '50%', 'margin-top': -($(this).height() / 2) });
	});

	// MENU
	$('#menu-icon').click(function() {
		$(this).hide();
		$('#menu').fadeIn('slow');
	});
	$('#menu-close').click(function() {
		$('#menu-icon').show();
		$('#menu').fadeOut('slow');
	});

	// WEATHER INFO
	var getJSON = function(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.responseType = 'json';
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status);
				}
			};
			xhr.send();
		});
	};
	var jsonUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?id=1273043&units=metric&appid=ba4f52c9ce9c222b8a6490b4c3ae857d';
	getJSON(jsonUrl).then(function(data) {
		$('#weather-info-temp').html(Math.ceil(parseInt(data.main.temp))+'°C');
		$('#weather-info-icon').append("<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'>")
	});

});