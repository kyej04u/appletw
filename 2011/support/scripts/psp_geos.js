function geoChanger(lang) {
    try {
        var currentPath = location.href;              
        var c = currentPath.indexOf(".com/");
        var s = currentPath.indexOf("/appletw/2011/support/");
        
        if (lang == ""){
            s = s + 1; // we don't need two slashes
        }
        
        var url = "";
        
        if ( (lang == "asia") || (lang == "cn") || (lang == "kr") || (lang == "tw") ) {
            var baseURL = "";
            if (lang == "asia") {
                baseURL = "http://www.asia.apple.com";
            }
            
            if (lang == "cn") {
                baseURL = "http://www.apple.com.cn";
            }
            
            if (lang == "kr") {
                baseURL = "http://www.apple.co.kr";
            }
            
            if (lang == "tw") {
                baseURL = "http://www.apple.com.tw";
            }
            
            url = baseURL + currentPath.substring(s);
        }
        else {
            // c+ 5 c and the length of .com/
            url = currentPath.substring(0, (c +5)) + lang + currentPath.substring(s);
        }
        
        window.location = url;
    }
    catch (e){}

}

function switchLang(lang) {
try{
        var currentPath = location.href;     
        var c = currentPath.lastIndexOf("/appletw/2011/");
        var s = currentPath.lastIndexOf("/store/");
        
        if (lang == ""){
            url = "/appletw/2011/support/itunes" +  currentPath.substring(s, c + 1)
        }
        else  url =  "/appletw/2011/support/latino/itunes" +  currentPath.substring(s, c + 1)

    top.window.location = url;
    }
    catch (e){}
}

function geoChangerPage(lang, pageName) {
    try {
        var currentPath = location.href;              
        var c = currentPath.indexOf(".com/");
        var s = currentPath.indexOf("/appletw/2011/support/");
        var p = currentPath.lastIndexOf("/appletw/2011/");
        
        if (lang == ""){
            s = s + 1; // we don't need two slashes
        }
        
        var url = "";
        
        if ( (lang == "asia") || (lang == "cn") || (lang == "kr") || (lang == "tw") ) {
            //alert("one of the 3 weird ones!");
            var baseURL = "";
            if (lang == "asia") {
                baseURL = "http://www.asia.apple.com";
            }
            
            if (lang == "cn") {
                baseURL = "http://www.apple.com.cn";
            }
            
            if (lang == "kr") {
                baseURL = "http://www.apple.co.kr";
            }
            
            if (lang == "tw") {
                baseURL = "http://www.apple.com.tw";
            }
            
            url = baseURL + currentPath.substring(s, (p+1)) + pageName;
        }
        else {
            // c+ 5 c and the length of .com/
            url = currentPath.substring(0, (c +5)) + lang + currentPath.substring(s, (p+1)) + pageName;
        }
        
        window.location = url;
    }
    catch (e){}

}


function geoChangerPath(lang, path) {
    try {
        var currentPath = location.href;              
        var c = currentPath.indexOf(".com/");
        var s = currentPath.indexOf("/appletw/2011/support/");
        
        if (lang == ""){
            s = s + 1; // we don't need two slashes
        }
        
        var url = "";
        
        if ( (lang == "asia") || (lang == "cn") || (lang == "kr") || (lang == "tw") ) {
            //alert("one of the 3 weird ones!");
            var baseURL = "";
            if (lang == "asia") {
                baseURL = "http://www.asia.apple.com";
            }
            
            if (lang == "cn") {
                baseURL = "http://www.apple.com.cn";
            }
            
            if (lang == "kr") {
                baseURL = "http://www.apple.co.kr";
            }
            
            if (lang == "tw") {
                baseURL = "http://www.apple.com.tw";
            }
            
            url = baseURL + path;
        }
        else {
            // c+ 5 c and the length of .com/
            url = currentPath.substring(0, (c +5)) + lang + path;
        }
        
        window.location = url;
    }
    catch (e){}

}
