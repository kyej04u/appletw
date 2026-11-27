Event.onDOMReady(function(){var h=["promo1","promo2","promo3","promo4"];for(var i=0;
i<h.length;i++){var f=h[i];var j=$$("#"+f+" div");if(j.length>1){for(var g=j.length-1;
g>=0;g--){j[g].className+=" "+f}new AC.PromoManager("hotnews-"+f,f)}}if($$(".slideritem").length>0){new AC.PromoManager.Rotation([new AC.PromoManager("hotnews-trailers","slideritem")],{interval:8,animationDuration:2})
}});