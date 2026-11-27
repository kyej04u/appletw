if(typeof(JSON)=="undefined"){JSON={}}JSON.Gallery=Class.create();Object.extend(JSON.Gallery.prototype,Event.Publisher);
Object.extend(JSON.Gallery.prototype,Event.Listener);Object.extend(JSON.Gallery.prototype,{sections:null,currentSection:null,initialize:function(a){this.sections=new Hash()
},addSection:function(a){this.sections.set(a.name,a);this.initializeSection(a)},load:function(b,a){if(b==this.currentSection){return
}this.dispatchEvent("activating",b);if(this.currentSection){this.dispatchEvent("deactivating",this.currentSection);
this.currentSection.hide()}b.load(a);this.currentSection=b},initializeSection:function(a){this.listenForEvent(this,"activatingByName",false,function(b){var c=b.event_data.data;
this.activateByName(name)});this.listenForEvent(this,"activating",false,function(b){var c=b.event_data.data;
this.indicateActive(c.trigger)});this.listenForEvent(this,"deactivating",false,function(b){var c=b.event_data.data;
this.indicateInactive(c.trigger)});Event.observe(a.trigger,"click",function(){this.indicateActive(a.trigger);
this.load(a)}.bind(this))},activateByName:function(a){var b=a.findElement("a");
var c=b.href.replace(/.*#/,"").toQueryParams();c=c.section;this.load(this.sections.get(c))
},indicateActive:function(a){a.addClassName("active")},indicateInactive:function(a){a.removeClassName("active")
}});JSON.Navigator=Class.create();Object.extend(JSON.Navigator.prototype,Event.Listener);
Object.extend(JSON.Navigator.prototype,{container:null,section:null,previousControl:null,nextControl:null,currentPageControl:null,pageControls:null,initialize:function(a){this.section=a;
this.container=document.createElement("div");this.container.appendChild(this.createPreviousControl());
this.container.appendChild(this.createPageControls());this.container.appendChild(this.createNextControl());
this.listenForEvent(a,"afterShow",false,function(){this.indicateCurrentPage()}.bind(this))
},createPreviousControl:function(){this.previousControl=document.createElement("a");
this.previousControl.setAttribute("href","#");Element.addClassName(this.previousControl,"previous");
this.previousControl.innerHTML="上一頁";Event.observe(this.previousControl,"click",function(a){if(0==this.section.currentPageIndex){Event.stop(a);
return}this.section.previousPage()}.bindAsEventListener(this));return this.previousControl
},createNextControl:function(){this.nextControl=document.createElement("a");this.nextControl.setAttribute("href","#");
Element.addClassName(this.nextControl,"next");this.nextControl.innerHTML="下一頁";
Event.observe(this.nextControl,"click",function(a){if(this.section.pages.length-1==this.section.currentPageIndex){Event.stop(a);
return}this.section.nextPage()}.bindAsEventListener(this));return this.nextControl
},createPageControls:function(){this.pageControls=[];var a=document.createElement("div");
Element.addClassName(a,"pages");for(var c=0;c<this.section.pages.length;c++){var b=document.createElement("a");
b.setAttribute("href","#section="+this.section.name+"&page="+(c+1));b.innerHTML=c+1;
Event.observe(b,"click",function(d,f,e){f.showPage(e)}.bindAsEventListener(this,this.section,c));
if(c===0){this.currentPageControl=b}else{if((c+1)==this.section.pages.length){Element.addClassName(b,"last")
}}this.pageControls.push(b);a.appendChild(b)}return a},indicateCurrentPage:function(){var a=this.section.currentPageIndex;
if(0==a){Element.addClassName(this.previousControl,"disabled")}else{Element.removeClassName(this.previousControl,"disabled")
}if((this.section.pages.length-1)==a){Element.addClassName(this.nextControl,"disabled")
}else{Element.removeClassName(this.nextControl,"disabled")}if(this.currentPageControl){Element.removeClassName(this.currentPageControl,"active")
}this.currentPageControl=this.pageControls[a];Element.addClassName(this.currentPageControl,"active");
var c="";if(0!=a){c="&page="+a}var b="";if(a<this.section.pages.length-1){b="&page="+(a+2)
}setTimeout(function(){this.previousControl.setAttribute("href","#section="+this.section.name+c);
this.nextControl.setAttribute("href","#section="+this.section.name+b)}.bind(this),0)
},hide:function(){this.container.hide()},show:function(){Element.show(this.container)
}});JSON.Section=Class.create();Object.extend(JSON.Section.prototype,Event.Publisher);
Object.extend(JSON.Section.prototype,{name:null,wrapper:null,container:null,feedUrl:null,topControls:null,bottomControls:null,loading:false,items:null,pages:[],cache:{},currentPageIndex:0,locked:false,initialize:function(c,a,e,b){this.name=c;
if(!this.wrapper){return}var d=new Element("div");this.wrapper.appendChild(d);this.container=d;
this.trigger=$(a);this.feedUrl=e;this.items=[];this.options=b||{};if(!this.options.renderList){this.options.renderList={}
}},load:function(initialPage){if(this.loading){return}if(this.items.length>0){this.show(initialPage);
return}else{if(this.items.length==0){this.loading=true;Element.addClassName(this.container,"loading");
new Ajax.Request(this.feedUrl,{method:"GET",evalJS:false,evalJSON:false,evalScripts:false,onSuccess:function(request){this._populate(eval("("+request.responseText+")"));
this.afterPopulate();this.loading=false;Element.removeClassName(this.container,"loading");
this.show(initialPage)}.bind(this),onException:function(r,e){throw (e)}})}}},_populate:function(b){for(var a=0;
a<b.length;a++){this.items.push(b[a])}},afterPopulate:function(){},clear:function(){this.container.addClassName("loading");
this.container.innerHTML="";this.pages=[];this.topControls=null;this.bottomControls=null
},render:function(){if(!this.getCache()){this.dispatchEvent("beforeRender",this);
this.pages=JSON.ListRenderStrategy.render(this.items,this.options.renderList);this.dispatchEvent("afterRender",this)
}if(this.currentPageIndex>=this.pages.length){this.currentPageIndex=0}this.container.innerHTML="";
this.drawControls();if(this.topControls){this.container.appendChild(this.topControls)
}for(var a=0;a<this.pages.length;a++){this.pages[a].style.display="none";this.container.appendChild(this.pages[a])
}if(this.bottomControls){this.container.appendChild(this.bottomControls)}},drawControls:function(){if(this.pages.length>1){this.topControls=new JSON.Navigator(this).container;
Element.addClassName(this.topControls,"pagination top");this.bottomControls=new JSON.Navigator(this).container;
Element.addClassName(this.bottomControls,"pagination bottom")}},show:function(a){if(this.loading){return
}this.render();this.container.show();this.showPage(a||0,true)},hide:function(){this.dispatchEvent("beforeHide",this);
this.container.hide();this.dispatchEvent("afterHide",this)},nextPage:function(){if((this.pages.length-1)==this.currentPageIndex){return
}this.showPage(this.currentPageIndex+1)},previousPage:function(){if(0==this.currentPageIndex){return
}this.showPage(this.currentPageIndex-1)},getCache:function(){return this.cache[JSON.currentViewOption]
},showPage:function(a,b){if(!b&&(this.locked||a==this.currentPageIndex)){return
}this.track();this.locked=true;this.dispatchEvent("beforeShow",this);if(typeof(this.options.beforeShow)=="function"){this.options.beforeShow(this,this.pages[this.currentPageIndex],this.pages[a],b)
}Element.hide(this.pages[this.currentPageIndex]);Element.show(this.pages[a]);if(this.topControls){Element.show(this.topControls)
}if(this.bottomControls){Element.show(this.bottomControls)}this.currentPageIndex=a;
this.locked=false;this.dispatchEvent("afterShow",this);if(typeof(this.options.afterShow)=="function"){this.options.afterShow(this,this.pages[this.currentPageIndex],this.pages[a],b)
}},track:function(){var a={};var b=this.trigger.innerHTML.stripTags();document.title=document.title.toString().replace(/(.* - .*) - .*/,"$1")+" - "+b;
a.pageName=AC.Tracking.pageName();a.prop6=a.pageName;a.prop4=document.location;
a.prop2="www.tw.hotnews."+this.name;AC.Tracking.trackPage(a)}});