if(typeof AC==="undefined"){var AC={}}AC.AutoGallery=Object.synthesize({__classNames:{wrapper:"autogallery",view:"gallery-view",content:"gallery-content"},__specialSwapViewTriggers:["next","previous","SwapViewFirstSection","SwapViewPreviousSelection"],galleries:{},slideshows:{},_classPrefix:"autogallery-",setClassPrefix:function(a){if(typeof a==="string"){this._classPrefix=a
}return this._classPrefix},initialize:function(){$$("."+this.__classNames.wrapper).each(function(a){this.__setUpGallery(a)
}.bind(this))},__setUpGallery:function(f){var c,b,a,d,e;c=this.Types.Registries.gallery.match(f,this._classPrefix);
b=c.getOptions();a=f.down("."+this.__classNames.view);if(this.__galleryViewIsValid(a)){d=f.select("."+this.__classNames.content);
d=d.concat(f.select("a."+a.id));d=this.__parseContent(d);e=c.context.viewer||AC.ViewMaster.Viewer;
this.galleries[a.id]=new e(d,a.id,a.id,b);this.galleries[a.id].__type=c;this.galleries[a.id].__wrapper=f;
this.__setUpDelegate(a,c);this.__setUpSlideshow(a,f)}},__galleryViewIsValid:function(a){if(!Object.isElement(a)){try{console.error("View element not found for gallery.")
}catch(b){}return false}if(typeof a.id!=="string"||a.id===""){try{console.error("Valid ID not found on view for gallery.")
}catch(b){}return false}if(typeof this.galleries[a.id]!=="undefined"){try{console.error('View ID "'+a.id+'" is not unique.')
}catch(b){}return false}return true},__setUpDelegate:function(a,e){var b=this,d={},c=this.__classNames.content,f;
f=function(g){if(typeof g==="object"&&g.__autogalleryAddedGalleryContentClassName!==true&&"content" in g&&Object.isElement(g.content)){g.content.addClassName(c);
g.__autogalleryAddedGalleryContentClassName=true}};d.manageZ=function(k,l,h,m,n,j){var i=(typeof m==="number")?m-1:"",o,g;
for(g in b.galleries){o=b.galleries[g];if(o.triggerClassName!==k.triggerClassName){if(o.__wrapper){o.__wrapper.style.zIndex=i
}if(o.view.view()){o.view.view().style.zIndex=i}if(o.currentSection&&o.currentSection.content){o.currentSection.content.style.zIndex=i
}}}if(typeof e.context.delegate==="object"){if(typeof e.context.delegate.manageZ==="function"){e.context.delegate.manageZ(k,l,h,m,n,j)
}}};d.willShow=function(g,i,h){f(h);if(typeof e.context.delegate==="object"){if(typeof e.context.delegate.willShow==="function"){e.context.delegate.willShow(g,i,h)
}}};d.didShow=function(g,i,h){f(h);if(typeof e.context.delegate==="object"){if(typeof e.context.delegate.didShow==="function"){e.context.delegate.didShow(g,i,h)
}}};if(typeof e.context.delegate==="object"){Object.extend(d,e.context.delegate)
}this.galleries[a.id].setDelegate(d)},__setUpSlideshow:function(a,c){var b;if(c.className.match("(^|\\s)"+this._classPrefix+"slideshow(-|\\s|$)")){b=this.Types.Registries.slideshow.match(c,this._classPrefix+"slideshow-");
this.slideshows[a.id]=new AC.ViewMaster.Slideshow(this.galleries[a.id],this._classPrefix+"slideshow-trigger",b.getOptions());
this.slideshows[a.id].__type=b}},addType:function(c,b,e,a,d){this.Types.Registries.gallery.addType(c,b,e,a,d)
},addSlideshowType:function(c,b,e,a,d){this.Types.Registries.slideshow.addType(c,b,e,a,d)
},__parseContent:function(d){var g,a,b=[],c=[];for(a=0;a<d.length;a++){if(d[a].hasClassName(this.__classNames.content)){g=d[a].getAttribute("id")
}else{g=d[a].getAttribute("href");if(!!g.match("#")){g=g.split("#")[1]}else{try{console.error("ID for trigger was not found in HREF.")
}catch(f){}}}if(typeof g==="string"&&g!==""){if(!this.__specialSwapViewTriggers.include(g)){if(!c.include(g)){c.push(g);
b.push(d[a])}}}else{try{console.error("ID for section was not valid.")}catch(f){}}}return b
},logTypes:function(){var c=0,a,b;try{console.log("----------------------------------")
}catch(d){}try{console.log("	Gallery Types")}catch(d){}try{console.log("----------------------------------")
}catch(d){}for(a in this.galleries){if(this.galleries.hasOwnProperty(a)){c++;try{console.log(c+". "+a+": "+this.galleries[a].__type.name)
}catch(d){}}}if(c===0){try{console.log("(none)")}catch(d){}}try{console.log("")
}catch(d){}c=0;try{console.log("----------------------------------")}catch(d){}try{console.log("	Slideshow Types")
}catch(d){}try{console.log("----------------------------------")}catch(d){}for(b in this.slideshows){if(this.slideshows.hasOwnProperty(b)){c++;
try{console.log(c+". "+b+": "+this.slideshows[b].__type.name)}catch(d){}}}if(c===0){try{console.log("(none)")
}catch(d){}}try{console.log("")}catch(d){}}});AC.AutoGallery.Types={};AC.AutoGallery.Types.Registry=Class.create({__reservedNames:["trigger"],initialize:function(){this.__model=[];
this.__lookup={}},addType:function(c,b,g,a,d){if(this.__reservedNames.indexOf(c)!==-1){try{console.error("Cannot add type: Type name is reserved: "+c)
}catch(h){}return}if(typeof b!=="object"){b={}}if(typeof c==="string"){var f=this.__lookup[a]||this.__lookup._base;
if(typeof this.__lookup[c]!=="undefined"){try{console.error("Cannot overwrite existing Type: "+c)
}catch(h){}return}this.__lookup[c]=new AC.AutoGallery.Types.Type(c,b,g,f,d);if(typeof this.__model[this.__lookup[c].level()]==="undefined"){this.__model[this.__lookup[c].level()]=[]
}this.__model[this.__lookup[c].level()].push(this.__lookup[c])}else{if(typeof c!=="string"){try{console.error("Cannot add type: Type Name must be a string.")
}catch(h){}}}},match:function(b,c){var a=null;if(!Object.isElement(b)){try{console.error("An element is required to match against a type.")
}catch(d){}return false}if(typeof c!=="string"){c=""}a=this.__matchName(b,c);if(a!==null){return a
}a=this.__matchQualifier(b,c);if(a!==null){return a}if(typeof this.__model[1]!=="undefined"){if(typeof this.__model[0]!=="undefined"){a=this.__model[1][0]
}else{try{console.error("Catchall Type not defined")}catch(d){}}}else{try{console.error("No non-_base types defined at index 1.")
}catch(d){}}return a},__matchName:function(c,d){var b,a;for(b=this.__model.length-1;
b>=0;b--){if(typeof this.__model[b]!=="undefined"){for(a=this.__model[b].length-1;
a>=0;a--){if(c.hasClassName(d+this.__model[b][a].name)){return this.__model[b][a]
}}}else{try{console.error("No array of types exists at this level.")}catch(f){}}}return null
},__matchQualifier:function(c,d){var b,a;for(b=this.__model.length-1;b>=0;b--){if(typeof this.__model[b]!=="undefined"){for(a=this.__model[b].length-1;
a>=0;a--){if(typeof this.__model[b][a].qualifier==="function"){if(this.__model[b][a].qualifier(c,d)===true){return this.__model[b][a]
}}else{try{console.error("Qualifier for "+this.__model[b][a].name+" is not a function.")
}catch(f){}}}}else{try{console.error("No array of types exists at this level.")
}catch(f){}}}return null},reserveName:function(a){if(typeof a==="string"){if(this.__lookup.indexOf(a)===-1){this.__reservedNames.push(a)
}else{try{console.error("Cannot reserve name: Type with name already exists.")}catch(b){}}}else{try{console.error("Cannot reserve name: Name must be a string")
}catch(b){}}}});AC.AutoGallery.Types.Type=Class.create({initialize:function(b,a,e,d,c){this.name=b;
this.options=a||{};this.qualifier=typeof e==="function"?e:Prototype.emptyFunction;
this.parent=d;this.context=c||{};this.level()},getOptions:function(){var a=(typeof this.parent==="undefined")?{}:this.parent.getOptions();
return Object.extend(a,this.options)},__level:null,level:function(){if(this.name==="_base"){return 0
}else{if(typeof this.parent==="undefined"||typeof this.parent.name==="_base"){return 1
}else{return this.parent.level()+1}}}});AC.AutoGallery.Types.Registries={};AC.AutoGallery.Types.Registries.gallery=new AC.AutoGallery.Types.Registry();
AC.AutoGallery.Types.Registries.slideshow=new AC.AutoGallery.Types.Registry();AC.AutoGallery.addType("_base",{manageZ:true,heightFromFirstSection:true,silentTriggers:true,imageLinkAutoCaptions:true,addSectionIdAsClassName:true,useHTML5Tags:true});
AC.AutoGallery.addType("image",{useKeyboardNav:true,discontinuousPreviousNext:true});
AC.AutoGallery.addType("slide",{useKeyboardNav:true,discontinuousPreviousNext:true,useTouchEvents:true},function(c,e){var a,b,d;
a=c.down("."+AC.AutoGallery.__classNames.view);if(Object.isElement(a)){b=a.getWidth();
d=c.getWidth();if(b>=d*2){return true}}return false},"_base",{viewer:AC.ViewMaster.SlideViewer});
AC.AutoGallery.addType("video",{manageZ:1010,showFirstOnStopMovie:true,ensureInView:true,escapeToClose:true},function(c,d){var a,e,b;
a=c.down("."+AC.AutoGallery.__classNames.view);if(Object.isElement(a)){e=a.getAttribute("id");
if(typeof e==="string"&&typeof a.down("a."+e)!=="undefined"){return true}}return false
});AC.AutoGallery.addSlideshowType("_base",{autoplay:true,stopOnUserInteraction:true});
AC.AutoGallery.addSlideshowType("standard",{discontinuousPreviousNext:false,stopAfterReturnToSection:false});
AC.AutoGallery.addSlideshowType("hero",{autoplay:2000,delay:7000,stopAfterReturnToSection:0,discontinuousPreviousNext:false});
Event.onDOMReady(function(){AC.AutoGallery.initialize();if(typeof AC.ViewMaster.Tracker==="function"){if(typeof window.tracker==="undefined"){window.tracker=new AC.ViewMaster.Tracker("click")
}}else{try{console.warn("/appletw/2011/global/scripts/view_master_tracker.js needs to be included on this page.")
}catch(a){}}});