<!--

var serialNumber = '';
function writeForm(sn) {
    if (sn != undefined) serialNumber = sn;
    snSpan = document.getElementById('spanOut');
	snSpan.innerHTML = introMsg + '</p><p><input type="text" size="14" name="serialNumber" id="serialNumber" value="' + serialNumber + '"/></p><p><input type="button" value="' + checkButton + '" onclick="getInfo()"></p>';
    if (sn != undefined) {
    	snSpan.parentNode.serialNumber.focus();
    	snSpan.parentNode.serialNumber.select();
    }
}

function writeNotResponding() {
	serialNumber = document.getElementById("serialNumber").value;
	document.getElementById("spanOut").innerHTML = introMsg + '</p><p><input type="text" size="14" name="serialNumber" id="serialNumber"/></p><p><input type="button" value="submit" onclick="getInfo()"></p>' + timeOut;
	document.getElementById("serialNumber").value=serialNumber;
}

function writeNoInfo() {
	serialNumber = document.getElementById("serialNumber").value;
	document.getElementById("spanOut").innerHTML = introMsg + '</p><p><input type="text" size="14" name="serialNumber" id="serialNumber"/></p><p><input type="button" value="submit" onclick="getInfo()"></p>' + noInfo;
	document.getElementById("serialNumber").value=serialNumber;
}

var request = null;

function createRequest() {
	try {
		XMLHTTP.Transport.prototype.abort = function() {
                	writeNotResponding();
        	}
		request = new XMLHTTP();
	}
	catch (failed) {
	} 
	
	if (request == null)
		alert("Error creating request object!");
}

function getInfo() {
	serialNumber = document.getElementById("serialNumber").value;
	serialNumber = replaceAndAlert(serialNumber);

	// remove spaces here
	if (serialNumber) {
		serialNumber = serialNumber.replace(/\s/g,'');
	}
	
	if (!validateSerialNumber(serialNumber)) {
		return false;
	}
	
	createRequest();
	var url = "http://acweb01.apple.com/eligibility/warranty/check.html?sn=" + escape(serialNumber);
	request.open("GET",url,true);
	document.getElementById("serialNumber").value=serialNumber;
	request.onreadystatechange = updatePage;
	document.getElementById("spanOut").innerHTML = document.getElementById("spanOut").innerHTML + waitMsg;
	document.getElementById("serialNumber").value=serialNumber;
	request.send(null);

}

function updatePage() {

	if (request.readyState == 4) {
		if (request.status == 200) {
			var strText = request.responseText;
			
			var jsonData = eval ('(' + request.responseText + ')');
			serial = jsonData.info[0].serial;
			var productName = jsonData.info[0].product;
			var warrantyCoverage = jsonData.info[0].coverage;
			var datePurchased = jsonData.info[0].purchase;
			var startDate = jsonData.info[0].start;
			var endDate = jsonData.info[0].end;
			var daysRemaining = jsonData.info[0].days;
			var appEligible = jsonData.info[0].app;
	
			var imageurl = jsonData.info[0].imageurl;
			var supporturl = jsonData.info[0].supporturl;
			var supportname = jsonData.info[0].supportname;
	
			var specialContract = false;
			var noCoverageMsg = false;
			var coverageMsg = '';
			
			// convert date format
			if (endDate) {
				var dateValArray = endDate.split("-");
				endDate = (dateValArray[2] + "-" + monthNames[dateValArray[1]] + "-" + dateValArray[0]);
			}
	
			descMsg = '<div class="checkwarrantytop">';
			descMsg += '<div class="title" style="padding-bottom: 5px;">' + titleMsg2 +'</div>';
			descMsg += '</div><div class="bodytext">';
			descMsg += '<div class="description"><img src="' + imageurl + '" align="left" alt="">';
			descMsg += productName + '<br>';
			descMsg += ' ' + serial + '</div>';
			
			// special contract message
			if (warrantyCoverage == 'CC' || warrantyCoverage == 'EC' || warrantyCoverage == 'PA' || warrantyCoverage == 'RA' || warrantyCoverage == 'TC' || warrantyCoverage == 'RE') {
				specialContract = true;
				coverageMsg = spMsg;
				
			}
			
			// limited warranty contract
			else if (warrantyCoverage == 'LI' || warrantyCoverage == 'PT' || warrantyCoverage == 'CS' || (warrantyCoverage == 'PP - PROC')) {
				coverageMsg = purchaseStr_1_1 + liMsg + purchaseStr_1_2;
			}
			
			// APP contract
			else if ( (warrantyCoverage == 'PP') && (productName.indexOf('XSERVE') != -1)) {
				coverageMsg = purchaseStr_1_1 + ppxMsg + purchaseStr_1_2;
			}
			
			// APSS contract (Xserve)
			else if (warrantyCoverage == 'PP') {
				coverageMsg = purchaseStr_1_1 + ppMsg + purchaseStr_1_2;
			}
	
			// out of warranty
			else if (warrantyCoverage == 'OO') {
				coverageMsg = returnMsg2 + returnMsg3f;
			}

			// we don't know coverage, but we have product info
			else if (productName) {
				coverageMsg = purchaseStr_4_1;
				noCoverageMsg = true;
			}
			
			else {
				noCoverageMsg = true;
			}
		
			if (datePurchased && daysRemaining > 0 && (!specialContract==true)) {
				coverageMsg = coverageMsg + purchaseStr_1_3 + endDate + purchaseStr_1_4 + returnMsg3e;
			}	
			
			// if no DOP display register message
			if (!datePurchased && (!specialContract==true)) {
				coverageMsg = coverageMsg + regMsg;
			}	
	
			// sell APSS (Xserve)
			if (appEligible && (productName.indexOf('XSERVE') != -1)) {
				coverageMsg = coverageMsg + returnMsg3d
			}
			// sell APP
			else if (appEligible) {
				coverageMsg = coverageMsg + returnMsg3c
			}
	
			var supportRef = '';
			if (supportname != '' && supporturl != '') {
				try {
					if (supportRef_1_2) {
					  supportRef = supportRef_1_1 + supporturl.toLowerCase() + '">' + supportname + supportRef_1_2 + '</div>';
				   }
				}
				catch(err) {}
			}
			else {
				supportRef = '';
			}

			// Also cover the case where we don't have support coverage info, but we recognize the serial number
			if (!noCoverageMsg || (noCoverageMsg && productName)) {
				document.getElementById("spanOut").innerHTML = descMsg + '<div class="bodytext" style="clear:both;">' + coverageMsg + '</div>' + '<p>' + supportRef + '</p>' + '<p>' + anotherSnMsg + '</p>' + '<p>' + legaldisclaimer + '</p>' + '<div>';  	
			}
			else if (noCoverageMsg) {
				writeNoInfo();
			}
		}
		else {
			writeNotResponding();
		}
		
	}

}

function checkForReturn(e) {
		e = e || window.event;
		var ch = e.which || e.keyCode;
		return !((ch == 3) || (ch == 13));
}


function isSerialNumberValid(serialNumber) {
	if (serialNumber.length == 0 ) {
         return true;
    }

    if( serialNumber.length != 11 && serialNumber.length != 12 && serialNumber.length != 18){
        return false;
    }
	
	if (serialNumber.length != 18) {	
		yrWkStr = serialNumber.substr(2, 3)
		if(isNaN(yrWkStr) == true){
			return false;
		}
	
		else {
			wkStr = yrWkStr.substr(1, 2)
			wk = parseInt(wkStr, 10)
			if(wk < 1 || wk > 53){
				return false;
			}
			else {
				return true;
			}
		}
	}
	else {
		if(isNaN(serialNumber) == true){
			return false;
		}
		else {
			return true;
		}
	}

}

function validateSerialNumber(sn) {
	if (!sn) {
		alert(noSerialAlert);
		return false;
	}
	else {
		sn = sn.replace(/\s/g,'');
	}
	if(isSerialNumberValid(sn) != true ) {
		alert(validSerialAlert);
		tryAgain()
		return false;
	}
	// Looks like a valid serial number
	return true;
}

function replaceChars(str,out,add) {
	// out = replace this
	// add = with this
	temp = "" + str; // temporary holder

	while (temp.indexOf(out)>-1) {
		pos= temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add + 
		temp.substring((pos + out.length), temp.length));
	}
	return temp;
}

function replaceAndAlert(str) {
// Replace O and o with zero's
	var chk = 0;
	for (i in c = new Array('O','o')) {
		var letter = c[i];
		if (str.indexOf(letter) > 0) {
			str = replaceChars(str,letter,'0');
			chk = 1;
		}
	}
	if (chk) {
		document.snCheck.SerialNumber.value = str;
		alert (replaceOsAlert);
	}
	return str;
}


//-->


// XMLHTTP JS class, a part of the AjaxExtended project
// Version 1.0 RC1, 2005 (c) Alex Serebryakov
// AjaxExtended is freely distributable under MIT license
// For more information, consult www.ajaxextended.com

XMLHTTP = function() {

  var _options = {
   maxRequestLength: 1500,
   apiURL: 'http://support.apple.com/eligibility/warranty/ajaxextended/index.php',
   apiKey: '',
   overrideMime: ''
  }

  this.status = null
  this.statusText = null
  this.responseText = null
  this.responseXML = null
  this.synchronous = false
  this.readyState = 0
  
  this.onreadystatechange =  function() { }
  this.onerror = function() { }
  this.onload = function() { }
  
  this.abort = function() {
    _stop = true
    _transport.abort()
  }

  this.setRequestHeader = function(name, value) {
    _request.headers[name] = value
  }
 
  this.getAllResponseHeaders = function() {
    var result = ''
    for (property in _responseHeaders)
      result += property + ': ' + _responseHeaders[property] + '\r\n'
    return result
  }
  
  this.getResponseHeader = function(name) {
    return _responseHeaders[name]
  }
  
  this.overrideMimeType = function(type) {
    _options.overrideMime = type
  }

  this.setAPI = function(url) {
    _options.apiURL = url
  }

  this.setKey = function(key) {
    _options.apiKey = key
  }
  
  this.open = function(method, url, sync, username, password) {
    _request.method = _is_defined(method)
    _request.url = _is_defined(url)
    var username = _is_defined(username)
    var password = _is_defined(password)
    var pos = _request.url.indexOf('://') + 3
    if((username || password) && pos > 2) {
      _request.url = _request.url.substr(0, pos)
        + username + ':'
        + password + '@'
        + _request.url.substr(pos)
    }
    _setReadyState(1)
  }
  
  this.openRequest = function(method, url, sync, username, password) {
    return this.open(method, url, sync, username, password)
  }
  
  this.send = function(data) {
    if (_stop) return
    _request.data = _is_defined(data)
    _transport.send(_request, _options)
  }
  
  var _is_defined = function(value) {
    return ('undefined' == typeof value) ? '' : value
  }

  var _throwError = function(description) {
    self.onerror(description)
    self.abort()
    return false
  }
  
  var _setReadyState = function(number) {
    self.readyState = number
    self.onreadystatechange()
    if(number == 4) self.onload()
  }

  var _parse = function(object) {
    if(_stop) return
    if(object.multipart) return
    if(!object.success)
      return _throwError(object.description)
    _responseHeaders = object.responseHeaders
    self.status = object.status
    self.statusText = object.statusText
    self.responseText = object.responseText
    self.responseXML = _xmlparser.parse(object.responseText)
    _setReadyState(4)
  }

  var self = this
  var _request = {
    headers: {
      "HTTP-Referer": document.location,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'GET',
    data: '',
    url: 'http://support.apple.com/eligibility/warranty/ajaxextended/'
  }
  var _response = { }
  var _stop = false
  var _transport = new XMLHTTP.Transport(_parse)
  var _xmlparser = new XMLHTTP.XMLParser()
    
}

XMLHTTP.Transport = function(handler) {

  var _registerCallback = function(handler) {
    _id = 'v' + Math.random().toString().substr(2)
    window[_id] = _onComplete
    _handler = handler
  }

  var _onComplete = function(data) {
    if(_parts-- == 1) _destroyScripts()
    handler(data)
  }

  var _encode = function(params) {
    var headers = ''
    for (property in params.headers)
      headers += _encodeUTF(property +
	    ': ' + params.headers[property]) + '&'
    var data = params.method
      + '&' + _encodeUTF(params.url)
      + '&' + _encodeUTF(params.data)
      + '&' + headers
    return base64encode(data)
  }

  var _encodeUTF = function(string) {
    return base64encode(utf8encode(string))
  }

  var _split = function(data, options) {
    var max = options.maxRequestLength - options.apiURL.length - 60
    var urls = [], total = Math.floor(data.length / max) + 1
    for (var part = 0; part < total; part++) {
      urls.push(options.apiURL +
        '?id=' + _id +
		'&key=' + options.apiKey +
        '&part=' + part +
        '&total=' + total +
        '&data=' + data.substr(0, max))
      data = data.substr(max)
    }
    _parts = urls.length
    return urls
  }

  this.send = function(params, options) {
    var urls = _split(_encode(params), options)
    for(var i = 0; i < urls.length; i++)
      _createScript(urls[i])
  }

  var _createScript = function(url) {
    var script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script = document.getElementsByTagName('head')[0].appendChild(script)
    _scripts.push(script)
  }

  var _destroyScripts = function() {
    for(var i = 0; i < _scripts.length; i++)
      if(_scripts[i].parentNode)
        _scripts[i].parentNode.removeChild(_scripts[i])
  }

  var self = this
  var _id, _scripts = []
  var _parts = 0
  var _handler = function() { }

  _registerCallback(handler)

}

var base64encode = function(input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
  do {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
       enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
       enc4 = 64
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4)
  } while (i < input.length)
  return output
}


function utf8encode(input) {
  if ('string' != typeof input) return ''
  input = input.replace(/\r\n/g,"\n");
  var output = "";
  for(var n = 0; n < input.length; n++) {
    var c = input.charCodeAt(n)
    if('null' != typeof c) {
      if (c < 128) {
        output += String.fromCharCode(c); }
      else if((c > 127) && (c < 2048)) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128); }
      else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);}
    }
  }
  return output;
}

XMLHTTP.XMLParser = function() {

  this.parse = function(text) { }

}