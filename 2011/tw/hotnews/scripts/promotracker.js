Event.onDOMReady(function() {
    var promos;
    if (promos=$('promos')) {
        promos.observe('mousedown', function(evt) {
			var element=null,
				position=null,
				image=null;
			if (element = evt.findElement('div')){
				if(position = element.readAttribute('id')){
					position = position.replace(/promo/,'');
				}
			}
			if(image = evt.findElement('img')){
				image = image.src;
				image = image.substring(image.lastIndexOf('/appletw/2011/')+1, image.length);
			}
			if(position!=null && image!=null){
				AC.Tracking.trackClick({
					prop2: position,
					prop3: 'p@' + image + ' - ' + AC.Tracking.pageName()
				}, this, 'o', 'p@' + image + ' - ' + AC.Tracking.pageName());
			}
    	});
    }
});
