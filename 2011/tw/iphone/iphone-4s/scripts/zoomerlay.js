var Zoomerlay=Class.create();Zoomerlay.options={minWidth:980,minHeight:600,outerSpacingX:0.1,outerSpacingY:0.1,maskSizeDiffX:2,maskSizeDiffY:26,shouldNotZoom:false};
Object.extend(Zoomerlay.prototype,{initialize:function(d,b,c,a){Zoomerlay.instances[b]=this;
this.options=Object.extend(Object.clone(Zoomerlay.options),a);this.viewer=new AC.ViewMaster.Viewer(null,c,d,{parentSectionId:b,parentTriggerClassName:"OverlayPanel",silentTriggers:true,shouldAnimateContentChange:false});
this.viewer.setDelegate({willShow:this.willShow.bind(this),didShow:this.didShow.bind(this)});
this.bindResize=this.resize.bind(this);this.bindMouseMove=this.onMouseMove.bind(this);
this.bindMouseDown=this.onMouseDown.bind(this);this.bindClick=this.onClick.bind(this)
},willShowOverlay:function(a){if(!this.initialized){this.initialized=true;this.overlay=$(a.event_data.data.incomingView.content);
this.heading=this.overlay.down("h2");this.mask=this.overlay.down(".mask");this.footer=this.overlay.down(".footer");
if(this.options.shouldNotZoom){this.overlay.addClassName("no-zoom")}}this.setMaskSize();
Event.observe((document.onresize?document:window),"resize",this.bindResize)},didShowOverlay:function(a){if(this.resetOnDidShowOverlay){this.didShow()
}this.resetOnDidShowOverlay=false;if(this.footer){this.footer.style.bottom="0px"
}},beforeCloseOverlay:function(a){Event.stopObserving((document.onresize?document:window),"resize",this.bindResize);
$(document.body).removeClassName("dragging");if(this.draggable){this.draggable.destroy()
}this.resetOnDidShowOverlay=true;if(this.caption){this.caption.remove()}},willShow:function(b,c,a){if(this.draggable){this.draggable.destroy()
}if(this.caption){this.caption.remove()}this.overlay.removeClassName("zoomed");
Event.stopObserving(this.mask,"mousemove",this.bindMouseMove);this.element=$(a.content);
if(!this.element.z){this.element.z={width:this.element.getAttribute("width"),height:this.element.getAttribute("height"),caption:this.element.getAttribute("title"),zoomed:false};
this.element.setAttribute("title","")}},didShow:function(b,c,a){if(this.element.z.zoomed){this.overlay.removeClassName("zoomed");
this.element.z.zoomed=false;if(this.footer){this.footer.show()}if(this.draggable){this.draggable.destroy()
}}if(this.element.z.caption){this.caption=new Element("p",{"class":"caption"}).update(this.element.z.caption);
this.element.insert({after:this.caption})}else{this.caption=null}this.setContentSizeAndBounds();
Event.observe(this.element,"mousedown",this.bindMouseDown);Event.observe(this.element,"click",this.bindClick)
},setMaskSize:function(){var b=window.innerWidth||(window.document.documentElement.clientWidth||window.document.body.clientWidth),e=window.innerHeight||(window.document.documentElement.clientHeight||window.document.body.clientHeight);
if(b<this.options.minWidth){b=this.options.minWidth}if(e<this.options.minHeight){e=this.options.minHeight
}this.overlayWidth=b-(this.options.outerSpacingX*b);this.overlayHeight=e-(this.options.outerSpacingY*e);
this.maskWidth=this.overlayWidth-this.options.maskSizeDiffX;this.maskHeight=this.overlayHeight-this.options.maskSizeDiffY;
if(this.options.contentWidth&&this.options.contentHeight){var d=20,c=20+(this.options.caption?22:0)+(this.options.thumbs?118:0);
var a=this.getShrunkContentDimensions(this.options.contentWidth,this.options.contentHeight,this.maskWidth-d,this.maskHeight-c);
this.maskWidth=a[0]+d;this.maskHeight=a[1]+c;this.overlayWidth=this.maskWidth+this.options.maskSizeDiffX;
this.overlayHeight=this.maskHeight+this.options.maskSizeDiffY}this.overlay.style.width=this.overlayWidth+"px";
this.overlay.style.height=this.overlayHeight+"px";this.mask.style.width=this.maskWidth+"px";
this.mask.style.height=this.maskHeight+"px"},getShrunkContentDimensions:function(e,b,d,c){if(e>d){var a=d/e;
e*=a;b*=a}if(b>c){var a=c/b;e*=a;b*=a}return[e,b]},setContentSizeAndBounds:function(b,n){var k=this.element.z.width,h=this.element.z.height;
if(!this.element.z.zoomed){this.footerHeight=(this.footer?this.footer.getHeight():0)+(this.caption?(this.caption.getHeight()+4):0);
var i=this.maskWidth-20,o=this.maskHeight-20-this.footerHeight;if(k>i){var j=i/k;
k*=j;h*=j}if(h>o){var j=o/h;k*=j;h*=j}if(this.caption){this.caption.style.top=(o+18)+"px"
}}var a=k,m=h;if(this.maskWidth<a){this.xMin=0;this.xMax=this.maskWidth-a}else{var d=(this.maskWidth-a)/2;
this.xMin=d;this.xMax=this.maskWidth-a-d}if(!this.element.z.zoomed&&this.footerHeight){this.maskHeight-=this.footerHeight
}if(this.maskHeight<m){this.yMin=0;this.yMax=this.maskHeight-m}else{var d=(this.maskHeight-m)/2;
this.yMin=d;this.yMax=this.maskHeight-m-d}if(!this.element.z.zoomed&&this.footerHeight){this.maskHeight+=this.footerHeight
}if(this.caption){this.caption.style.width=(this.maskWidth-20)+"px"}if(b){var f=this.xMin,c=this.yMin;
if(n){var e=this.element.cumulativeOffset();f-=(k*((n.pageX-e.left)/this.element.getWidth()))-(this.maskWidth/2);
if(f>this.xMin){f=this.xMin}else{if(f<this.xMax){f=this.xMax}}c-=(h*((n.pageY-e.top)/this.element.getHeight()))-(this.maskHeight/2);
if(c>this.yMin){c=this.yMin}else{if(c<this.yMax){c=this.yMax}}}var g=(100*k)/this.element.getWidth();
new Effect.Parallel([new Effect.Move(this.element,{sync:true,x:f,y:c,mode:"absolute"}),new Effect.Scale(this.element,g,{sync:true})],{duration:0.3})
}else{this.element.setStyle({width:k+"px",height:h+"px",left:this.xMin+"px",top:this.yMin+"px"})
}},resize:function(){this.setMaskSize();this.setContentSizeAndBounds();this.resizeOverlay(this.overlayWidth,this.overlayHeight)
},resizeOverlay:function(b,a){AC.OverlayPanel.overlay.overlay.setStyle({width:b+"px",height:a+"px"});
AC.OverlayPanel.overlay.defaultWidth=b;AC.OverlayPanel.overlay.defaultHeight=a;
AC.OverlayPanel.overlay.positionOverlay()},css:function(a,c){if(c){var b={};b[a]=c+"px";
this.element.setStyle(b)}else{return(val=this.element.getStyle(a))?parseInt(val):0
}},onMouseMove:function(a){if(this.footer){if((a.pageY-this.mask.cumulativeOffset().top)>(this.maskHeight-40)){if(!this.dragging&&!this.footerVisible){this.footerVisible=true;
if(this.footerEffect){this.footerEffect.cancel()}this.footerEffect=new Effect.Morph(this.footer,{style:{bottom:"0px"},duration:0.2})
}}else{if(this.footerVisible){this.footerVisible=false;if(this.footerEffect){this.footerEffect.cancel()
}this.footerEffect=new Effect.Morph(this.footer,{style:{bottom:-this.footerHeight+"px"},duration:0.2})
}}}this.overlay.addClassName("grabcursor");if(this.mouseMoveTimeout){clearTimeout(this.mouseMoveTimeout)
}if(!this.footer||!this.footerVisible){this.mouseMoveTimeout=setTimeout(this.onMousePause.bind(this),2000)
}},onMousePause:function(){this.overlay.removeClassName("grabcursor")},onMouseDown:function(a){this.mouseEvent=a
},onClick:function(a){if(this.mouseEvent&&a.pageX==this.mouseEvent.pageX&&a.pageY==this.mouseEvent.pageY){if(!this.element.z.zoomed){this.zoomIn(a)
}else{this.zoomOut(a)}}},zoomIn:function(a){if(!this.options.shouldNotZoom){this.element.z.zoomed=true;
this.setContentSizeAndBounds(true,a);var b=[];if(this.caption){b.push(new Effect.Morph(this.caption,{style:{marginTop:this.footerHeight+"px"},sync:true}))
}if(this.footer){b.push(new Effect.Morph(this.footer,{style:{bottom:-this.footerHeight+"px"},sync:true}))
}if(b.length>0){new Effect.Parallel(b,{duration:0.2,afterFinish:function(){if(this.caption){this.caption.hide()
}this.overlay.addClassName("zoomed")}.bind(this)})}if(!AC.Detector.isIE()){this.draggable=new Draggable(this.element,{starteffect:null,reverteffect:null,endeffect:null,onStart:this.onDragStart.bind(this),onDrag:this.onDrag.bind(this),change:this.change.bind(this),onEnd:this.onDragEnd.bind(this)})
}Event.observe(this.mask,"mousemove",this.bindMouseMove);AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - "+this.element.id.replace("MASKED-","")+" - zoom in"},this,"o",AC.Tracking.pageName()+" - "+this.element.id.replace("MASKED-","")+" - zoom in")
}},zoomOut:function(a){if(!AC.Detector.isIE()){this.draggable.destroy()}this.overlay.removeClassName("zoomed");
this.element.z.zoomed=false;this.setContentSizeAndBounds(true);var b=[];if(this.caption){this.caption.show();
b.push(new Effect.Morph(this.caption,{style:{marginTop:"0px"},sync:true}))}if(this.footer){b.push(new Effect.Morph(this.footer,{style:{bottom:"0px"},sync:true}))
}if(b.length>0){new Effect.Parallel(b,{duration:0.2,delay:0.1})}Event.stopObserving(this.mask,"mousemove",this.bindMouseMove);
AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - "+this.element.id.replace("MASKED-","")+" - zoom out"},this,"o",AC.Tracking.pageName()+" - "+this.element.id.replace("MASKED-","")+" - zoom out")
},onDragStart:function(a,b){$(document.body).addClassName("dragging");this.dragging=true;
if(this.effect&&this.effect.state=="running"){this.effect.cancel()}this.interval=setInterval(this.updateHistory.bind(this),30);
this.history=$A();AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - "+this.element.id.replace("MASKED-","")+" - dragging"},this,"o",AC.Tracking.pageName()+" - "+this.element.id.replace("MASKED-","")+" - dragging")
},onDrag:function(a,b){this.cursor=[b.clientX,b.clientY]},updateHistory:function(){if(this.history.length>2){this.history.pop()
}this.history.unshift(this.cursor)},change:function(a){var c=this.css("left"),b=this.css("top");
if(c>this.xMin){this.css("left",c+(this.xMin-c)/2)}else{if(c<this.xMax){this.css("left",c+((this.xMax-c)/2))
}}if(b>this.yMin){this.css("top",b+(this.yMin-b)/2)}else{if(b<this.yMax){this.css("top",b+((this.yMax-b)/2))
}}},onDragEnd:function(a,b){$(document.body).removeClassName("dragging");this.dragging=false;
var d=this.css("left"),c=this.css("top");if(this.history.length>=2){d-=(parseInt(this.history.last()[0]-this.history.first()[0])/this.history.length)*10,c-=(parseInt(this.history.last()[1]-this.history.first()[1])/this.history.length)*10
}xBand=d-(d>this.xMin?this.xMin:(d<this.xMax?this.xMax:d)),yBand=c-(c>this.yMin?this.yMin:(c<this.yMax?this.yMax:c));
this.effect=new Zoomerlay.Move(this.element,{duration:0.5,x:d,y:c,xBand:xBand,yBand:yBand});
this.history=null;clearInterval(this.interval)}});Zoomerlay.instances={};Zoomerlay.Dispatch=Class.create({initialize:function(){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,this.didShow);
this.listenForEvent(AC.OverlayPanel.overlay,"afterPop",false,this.afterPop);this.listenForEvent(AC.OverlayPanel.overlay,"beforeClose",false,this.beforeClose);
this.listenForEvent(AC.OverlayPanel.overlay,"afterClose",false,this.afterClose)
},isZoomerlay:function(a){return(a.event_data.data.sender.overlayId=="OverlayPanel"&&a.event_data.data.incomingView&&Zoomerlay.instances[a.event_data.data.incomingView.id])
},willShow:function(a){if(!this.isZoomerlay(a)){return}this.currentInstance=Zoomerlay.instances[a.event_data.data.incomingView.id];
this.currentInstance.willShowOverlay(a);AC.OverlayPanel.overlay.overlay.addClassName("zoomerlay");
AC.OverlayPanel.overlay.setOverlayShadowImageSrc("/appletw/2011/global/elements/zoomerlay/zoomerlay_bg.png")
},didShow:function(a){if(!this.isZoomerlay(a)){return}this.currentInstance.didShowOverlay(a)
},afterPop:function(a){Event.stopObserving((document.onresize?document:window),"resize",AC.OverlayPanel.overlay.bindPositionOverlay)
},beforeClose:function(a){if(this.currentInstance){this.currentInstance.beforeCloseOverlay(a)
}},afterClose:function(a){AC.OverlayPanel.overlay.overlay.removeClassName("zoomerlay");
AC.OverlayPanel.overlay.setOverlayShadowImageSrc(Zoomerlay.defaultOverlayShadowSrc)
}});Object.extend(Zoomerlay.Dispatch.prototype,Event.Listener);Zoomerlay.Move=Class.create(Effect.Base,{initialize:function(b,a){this.element=$(b);
if(!this.element){throw (Effect._elementDoesNotExistError)}var a=Object.extend({x:0,y:0,xBand:0,yBand:0,mode:"absolute",transition:Effect.Transitions.linear},arguments[1]||{});
this.start(a)},setup:function(){this.element.makePositioned();this.originalLeft=(l=this.element.getStyle("left"))?parseFloat(l):0;
this.originalTop=(t=this.element.getStyle("top"))?parseFloat(t):0;if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;
this.options.y=this.options.y-this.originalTop}},update:function(b){b=Effect.Transitions.Expo.easeOut(b);
var f=(b*this.fromToDelta)+this.options.from,a=b*this.options.xBand,e=b*this.options.yBand;
var d=(this.options.x*f-a+this.originalLeft).round()+"px";var c=(this.options.y*f-e+this.originalTop).round()+"px";
this.element.setStyle({left:d,top:c})}});Event.onDOMReady(function(){Zoomerlay.defaultOverlayShadowSrc=AC.OverlayPanel.overlay._overlayShadowSrc;
AC.OverlayScreen.opacity=0.5;new Zoomerlay.Dispatch()});