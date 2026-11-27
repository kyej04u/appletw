if(typeof(HotNews)=="undefined"){HotNews={}}if(typeof(JSON)=="undefined"){JSON={}
}HotNews.ItemRenderStrategy={story:{},featured:{}};Object.extend(HotNews.ItemRenderStrategy.story,{render:function(c){var d=this.renderTitle(c);
var a=this.renderDate(c);var b=this.renderDesc(c);var c=document.createElement("li");
c.appendChild(d);c.appendChild(a);c.appendChild(b);return c},outsideLink:function(a){if(a.link.match("http://")){if(!a.link.match("http://www.apple.com/tw/")){return true
}}return false},newWin:function(a,b){if(!b){a.addClassName("external")}return a
},renderTitle:function(b){if(b.link){var a=$(document.createElement("a"));a.setAttribute("href",b.link);
a.innerHTML=unescape(b.title);if(this.outsideLink(b)){a=this.newWin(a)}var c=document.createElement("h3");
c.appendChild(a)}else{var c=document.createElement("h3");c.innerHTML=b.title}return c
},renderDate:function(a){var b=$(document.createElement("p"));b.addClassName("date");
b.innerHTML=a.date;return b},renderDesc:function(c){var b=document.createElement("p");
b.innerHTML=unescape(c.copy);if(c.section.length>0){var e=$(document.createElement("span"));
e.addClassName("section");e.innerHTML="Filed under: ~%#@~";c.section.each(function(j,g){if(g>0){e.appendChild(document.createTextNode(", ~%#@~"))
}for(name in HotNews.sections){var k=HotNews.sections[name].trigger.innerHTML.stripTags().strip();
if(j==k){var f=name}}var h=document.createElement("a");h.setAttribute("href","#section="+f);
h.innerHTML=j;e.insert(h);if(g==c.section.length-1){e.appendChild(document.createTextNode("."))
}});b.appendChild(document.createTextNode(" ~%#@~"));b.appendChild(e)}if(c.link){var a=$(document.createElement("a"));
a.setAttribute("href",c.link);a.innerHTML=c.readmore;if(this.outsideLink(c)){a=this.newWin(a)
}var d=$(document.createElement("span"));d.addClassName("source");d.innerHTML="進一步閱讀: ~%#@~";
d.appendChild(a)}b.appendChild(document.createTextNode(" ~%#@~"));if(d){b.appendChild(d)
}b.innerHTML=b.innerHTML.replace(/~%#@~/g,"");return b}});Object.extend(Object.extend(HotNews.ItemRenderStrategy.featured,HotNews.ItemRenderStrategy.story),{render:function(c){var d=this.renderImage(c);
var e=this.renderTitle(c);var a=this.renderDate(c);var b=this.renderDesc(c);var c=document.createElement("li");
c.appendChild(d);c.appendChild(e);c.appendChild(a);c.appendChild(b);return c},renderImage:function(b){var c=new Element("img",{src:b.image,alt:unescape(b.title),className:"left",border:"0"});
var a=document.createElement("a");a.setAttribute("href",b.link);a.appendChild(c);
if(this.outsideLink(b)){a=this.newWin(a,true)}return a}});HotNews.ListRenderStrategy={stories:{},featured:{}};
Object.extend(HotNews.ListRenderStrategy.stories,{classNames:"stories",itemRenderStrategy:HotNews.ItemRenderStrategy.story,pageSize:10,render:function(b,a){this.options=a||{};
if(!this.options.removeFeatured){this.options.removeFeatured=false}this.pages=[];
var c=HotNews.ListRenderStrategy.featured.render(b);if(this.options.removeFeatured){var b=HotNews.ListRenderStrategy.featured.getList()
}b.eachSlice(this.pageSize).each(this.renderList.bind(this));if(c){var d=$(document.createElement("div"));
d.appendChild(c);d.appendChild(this.pages[0]);this.pages[0]=d}return this.pages
},renderList:function(c,b){var d=this.itemRenderStrategy;var a=new Element("ul",{className:this.classNames});
c.each(function(f,e){a.appendChild(d.render(f))});if(this.pages){this.pages.push(a)
}return a}});Object.extend(Object.extend(HotNews.ListRenderStrategy.featured,HotNews.ListRenderStrategy.stories),{classNames:"stories featured",itemRenderStrategy:HotNews.ItemRenderStrategy.featured,pageSize:0,render:function(a){this.pages=false;
var b=[];a.each(function(c){if(c.featured==true){b.push(c);a=a.without(c)}});this.list=a;
var a=this.renderList(b);if(a.innerHTML&&a.innerHTML!=""){return a}return false
},getList:function(){return this.list}});JSON.ListRenderStrategy=HotNews.ListRenderStrategy.stories;
Event.onDOMReady(function(){var i=function(m,l,j,k){var n=!k;if(n){$(j).setOpacity(0);
$(l).setOpacity(0);new Effect.ScrollTo($("content"),{duration:0.3})}};var c=function(n,m,k,l){var o=!l;
if(o){new Effect.Appear(k,{duration:0.4,afterFinish:function(){k.style.height=$(k).getDimensions().height+1+"px"
}})}if(!n.getCache()){var j=n.container.select("p span.section a");j.each(function(p){p.observe("click",e.activateByName.bind(e))
})}};var e=new JSON.Gallery("latestnews");var h={beforeShow:i,afterShow:c};var f={};
Object.extend(Object.extend(f,h),{renderList:{removeFeatured:true}});JSON.Section.prototype.wrapper=$("latestnewsstories");
HotNews.sections={all:new JSON.Section("all","sn-all","/appletw/2011/tw/hotnews/feeds/all.json",f),mac:new JSON.Section("mac","sn-mac","/appletw/2011/tw/hotnews/feeds/mac.json",h),itunes:new JSON.Section("itunes","sn-itunes","/appletw/2011/tw/hotnews/feeds/itunes.json",h),iphone:new JSON.Section("iphone","sn-iphone","/appletw/2011/tw/hotnews/feeds/iphone.json",h)};
for(var g in HotNews.sections){e.addSection(HotNews.sections[g])}var a=e.sections.values()[0];
var d=0;var b=document.location.hash.replace("#","?").toQueryParams();if(b.section){a=e.sections.get(b.section)
}if(b.page){d=b.page-1}e.load(a,d)});