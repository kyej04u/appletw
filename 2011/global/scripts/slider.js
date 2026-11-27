if(typeof(AC)=="undefined"){AC={}}AC.Slider=Class.create();AC.Slider.prototype={orientation:"horizontal",container:null,items:null,currentPage:1,itemsPerPage:null,totalPages:null,maskInnerDimension:null,isAnimating:false,_isCarousel:true,initialize:function(a,c,b){this.items=new Array();
this.itemsPerPage=b;this.container=$(a);this.populate(c)},setCarousel:function(a){this._isCarousel=a
},populate:function(){this.container.innerHTML="The slider requires population with data. You need to call this.render(itemsPerPage) from your custom this.populate() function."
},render:function(b){this.container.innerHTML="";if(!b){b=this.itemsPerPage}this.itemsPerPage=b;
this.list=Builder.node("ul",this.renderItems());var a=Builder.node("div",{"class":"ACSliderMaskDiv"},[this.list]);
this.container.appendChild(a);this.totalPages=Math.ceil(this.items.length/this.itemsPerPage);
if(this.items.length>this.itemsPerPage){this.positionWithinMask(a);this.createArrows();
this.createDots()}},positionWithinMask:function(a){if(this.orientation=="horizontal"){this.maskInnerDimension=Element.getInnerDimensions(a).width;
this.list.style.left=-this.maskInnerDimension*this.currentPage+"px"}else{this.maskInnerDimension=Element.getInnerDimensions(a).height;
this.list.style.top=-this.maskInnerDimension*this.currentPage+"px"}},renderItems:function(){var f=[];
var b=this.items.length-this.items.length%this.itemsPerPage;if(b==this.items.length){b=this.items.length-this.itemsPerPage
}var d=this.itemsPerPage-this.items.length%this.itemsPerPage;if(d==this.itemsPerPage){d=0
}var e=this.items.length>this.itemsPerPage;if(e){f.push(this.renderPlaceholderItems(b,this.items.length));
for(var a=0;a<d;a++){var c=Builder.node("li",{"class":"empty"});f.push(c)}}for(var a=0;
a<this.items.length;a++){var c=this.items[a].render().cloneNode(true);f.push(c)
}if(e){for(var a=0;a<d;a++){var c=Builder.node("li",{"class":"empty"});f.push(c)
}f.push(this.renderPlaceholderItems(0,this.itemsPerPage))}return f},renderPlaceholderItems:function(g,c){var e=[];
for(var b=g;b<c;b++){var d=this.items[b].render().cloneNode(true);if(d.id){d.removeAttribute("id")
}for(var a=0,f;f=d.childNodes[a];a++){if(f.getAttribute("id")){f.removeAttribute("id")
}}$(d).addClassName("cloned");e.push(d)}return e},createArrows:function(){this.prevArrow=Builder.node("a",{"class":"ACSliderPreviousArrow"},"&lt;");
Event.observe(this.prevArrow,"click",function(a){Event.stop(a);if(this._isCarousel===true||(this._isCarousel===false&&this.currentPage!=1)){this.getPrevious()
}}.bind(this));this.container.appendChild(this.prevArrow);this.nextArrow=Builder.node("a",{"class":"ACSliderNextArrow"},"&gt;");
Event.observe(this.nextArrow,"click",function(a){Event.stop(a);if(this._isCarousel===true||(this._isCarousel===false&&this.currentPage!=this.totalPages)){this.getNext()
}}.bind(this));this.container.appendChild(this.nextArrow)},createDots:function(){this.pageNav=Builder.node("ul",{"class":"ACSliderPageNav"});
for(var b=1;b<=this.totalPages;b++){var a=(b==this.currentPage)?Builder.node("a",{"class":"active"},b):Builder.node("a",b);
$(a).observe("click",function(e,d){Event.stop(e);this.scrolltoPageNumber(d)}.bindAsEventListener(this,b));
var c=Builder.node("li",[a]);this.pageNav.appendChild(c)}this.container.appendChild(this.pageNav)
},getPrevious:function(){var a=this.currentPage-1;this.scrolltoPageNumber(a,1)},getNext:function(){var a=this.currentPage+1;
this.scrolltoPageNumber(a,-1)},scrolltoPageNumber:function(f,e){if(this.currentPage!=f&&!this.isAnimating){if(!e){var e=this.currentPage-f
}this.isAnimating=true;this.currentPage=f;this.resetPages();var d=this.pageNav.getElementsByTagName("a");
for(var c=0,b;b=d[c];c++){if(Element.hasClassName(b,"active")){Element.removeClassName(b,"active")
}if(b.innerHTML==this.currentPage){Element.addClassName(b,"active")}}var a={duration:0.5,queue:{position:"end",scope:"sliderQueue",limit:1},afterFinish:this.afterScroll.bind(this)};
if(!this.maskInnerDimension){this.positionWithinMask(this.container)}if(this.orientation=="horizontal"){new Effect.MoveBy(this.list,0,this.maskInnerDimension*e,a)
}else{new Effect.MoveBy(this.list,this.maskInnerDimension*e,0,a)}}},jumptoPageNumber:function(f){if(this.currentPage!=f&&!this.isAnimating){var e=this.currentPage-f;
this.currentPage=f;this.resetPages();if(this.pageNav){var d=this.pageNav.getElementsByTagName("a");
for(var c=0,b;b=d[c];c++){if(Element.hasClassName(b,"active")){Element.removeClassName(b,"active")
}if(b.innerHTML==this.currentPage){Element.addClassName(b,"active")}}}var a={duration:0};
if(this.orientation=="horizontal"){new Effect.MoveBy(this.list,0,this.maskInnerDimension*e,a)
}else{new Effect.MoveBy(this.list,this.maskInnerDimension*e,0,a)}}},resetArrows:function(){if(this.prevArrow){this.prevArrow.removeClassName("inactive")
}if(this.nextArrow){this.nextArrow.removeClassName("inactive")}if(this.currentPage==1){this.prevArrow.addClassName("inactive")
}else{if(this.currentPage==this.totalPages){this.nextArrow.addClassName("inactive")
}}},resetPages:function(){this.resetArrows();if(this.currentPage==0){this.currentPage=this.totalPages;
this.positionOffset=-this.maskInnerDimension*this.totalPages+"px";if(this.prevArrow){this.prevArrow.addClassName("inactive")
}}else{if(this.currentPage==this.totalPages+1){this.currentPage=1;this.positionOffset=-this.maskInnerDimension+"px";
if(this.nextArrow){this.nextArrow.addClassName("inactive")}}else{this.positionOffset=false
}}},afterScroll:function(){if(this.positionOffset){if(this.orientation=="horizontal"){this.list.style.left=this.positionOffset
}else{this.list.style.top=this.positionOffset}}this.isAnimating=false},jumpToPage:function(a){}};
AC.SliderItem=Class.create();AC.SliderItem.prototype={html:"List items must be populated with data; it can be an HTML object or HTML as a string.",initialize:function(a){if(a){this.html=a
}},render:function(){if(typeof(this.html)=="string"){var a=Builder.node("li");a.innerHTML=this.html
}else{var a=Builder.node("li",[this.html])}return a}};
