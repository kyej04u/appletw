Event.onDOMReady(function() {
	
	// sidebar fader
	var trailers = $('sb-trailers').down('#slider');
	var trailersChildren = $('sb-trailers').select('.slideritem');
	if (trailersChildren.length > 1) {
		new AC.CrossfadeQueue(trailersChildren, $('slider'), 10, 'sb-trailersfader', 6, 1);
	}

	// var slider = Class.create();
	// Object.extend(Object.extend(slider.prototype, AC.Slider.prototype), {
	// 	populate: function() {
	// 		var items = document.getElementsByClassName('slideritem');
	// 		for (var i=0; i<items.length; i++) {
	// 			var movie = items[i].getElementsByTagName('div')[0];
	// 			var posterLink = movie.getElementsByTagName('a')[0];
	// 			var sliderItem = new AC.SliderItem(posterLink);
	// 			this.items.push(sliderItem);
	// 		}
	// 
	// 		this.render(1);
	// 	}
	// });
	// new slider('slider');

	// sidebar sliders
	var itunesslider = new AC.SlidingBureau($('sb-itunes'));
	var itunesdrawers = $$("#sb-itunes .drawers>li");
	for (var i = 0; i < itunesdrawers.length; i++) {
		var handle = itunesdrawers[i].getElementsByClassName('drawer-handle')[0];
		var content = itunesdrawers[i].getElementsByClassName('drawer-content')[0];
		var drawer = new AC.SlidingDrawer(content, handle, itunesslider, {
			triggerEvent: 'mouseover', triggerDelay: 120});
		itunesslider.addDrawer(drawer);
	}
	var downloadsslider = new AC.SlidingBureau($('sb-downloads'));
	var downloadsdrawers = $$("#sb-downloads .drawers>li");
	for (var i = 0; i < downloadsdrawers.length; i++) {
		var handle = downloadsdrawers[i].getElementsByClassName('drawer-handle')[0];
		var content = downloadsdrawers[i].getElementsByClassName('drawer-content')[0];
		var drawer = new AC.SlidingDrawer(content, handle, downloadsslider, {
			triggerEvent: 'mouseover', triggerDelay: 120});
		downloadsslider.addDrawer(drawer);
	}
	

});
