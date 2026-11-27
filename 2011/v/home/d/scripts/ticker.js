Effect.DefaultOptions.duration=0.3;NewsTicker=Class.create();Object.extend(NewsTicker.prototype,{tickerDiv:"ticker",tickerLocation:"billboard",tickerTitle:"news-link",tickerLink:"/hotnews/",feedURL:"/hotnews/feeds/ticker.rss",pauseLength:3500,timer:0,currentTitle:0,items:null,initialize:function(){this.items=[];
var a=document.getElementById("ticker-headline");if(a){this.tickerLink=a.href}var b=document.getElementById("ticker-rss-link");
if(b){this.feedURL=b.href}new Ajax.Request(this.feedURL,{method:"get",onSuccess:function(c){this.parseXML(c.responseXML);
this.buildTicker()}.bind(this),onFailure:function(){console.log("Please visit http://www.apple.com/hotnews for the latest news and information on Apple.")
},onException:function(d,c){}})},buildTicker:function(){if(this.items[this.currentTitle]){$(this.tickerTitle).innerHTML=this.items[this.currentTitle]["title"];
this.start()}},parseXML:function(a){$A(a.getElementsByTagName("item")).each(function(c){title=c.getElementsByTagName("title")[0].childNodes[0].nodeValue;
var b=NewsTicker.tickerLink;this.items.push({title:title,link:b})}.bind(this))},start:function(){this.interval=setInterval(this.showNext.bind(this),this.pauseLength)
},stop:function(){clearInterval(this.interval)},showNext:function(){if(this.currentTitle<this.items.length-1){this.currentTitle=this.currentTitle+1
}else{this.currentTitle=0}new Effect.Fade("news-link",{afterFinish:function(){this.switchData();
new Effect.Appear("news-link")}.bind(this)})},switchData:function(){$(this.tickerTitle).setAttribute("href",this.tickerLink);
if(this.items[this.currentTitle]){$(this.tickerTitle).innerHTML=this.items[this.currentTitle]["title"]
}}});Event.observe(window,"load",function(){var a=new NewsTicker()});