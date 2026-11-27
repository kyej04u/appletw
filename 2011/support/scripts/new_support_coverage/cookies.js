/**
 * Sets a Cookie with the given name and value.
 *
 * name       Name of the cookie
 * value      Value of the cookie
 * [expires]  Expiration date of the cookie (default: end of current session)
 * [path]     Path where the cookie is valid (default: path of calling document)
 * [domain]   Domain where the cookie is valid
 *              (default: domain of calling document)
 * [secure]   Boolean value indicating if the cookie transmission requires a
 *              secure transmission
 */
function setCookie(name, value, expires, path, domain, secure)
{
    document.cookie= name + "=" + escape(value) +
        ";expires=Fri, 01-Jan-10 00:00:01 GMT" +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

/**
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 */
function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

/**
 * Deletes the specified cookie.
 *
 * name      name of the cookie
 * [path]    path of the cookie (must be same as path used to create cookie)
 * [domain]  domain of the cookie (must be same as domain used to create cookie)
 */
function deleteCookie(name, path, domain)
{
    if (getCookie(name))
    {
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

/**
 * Write an individual value to the cookie. 
*/
function writeCookieValue(val) {
	if (val == 'firstName') pos = 0
	else if (val == 'lastName') pos = 1
	else if (val == 'symptom') pos = 2
	else if (val == 'serialNumber')  pos = 3
	else if (val == 'warrantyStatus') pos = 4
	else if (val == 'refURL') pos = 5
	try {
	var cookieData = getCookie("chat");
	var cookieDataArray = cookieData.split("~");
	returnVal = cookieDataArray[pos];
	}
	catch(err) {}
	if (returnVal && returnVal != 'undefined') {
		document.write(returnVal);
	}
	else {
		document.write('');
	}
}

/**
 * Update chat cookie with new value. This will create a new cookie if it doesn't
 * already exist, with just this value entered.

 * item       Name of the cookie item to update
 * val        Value of the item
*/
function updateChatCookie(item,val) {
	if (item == 'firstName') pos = 0
	else if (item == 'lastName') pos = 1
	else if (item == 'symptom') pos = 2
	else if (item == 'serialNumber')  pos = 3
	else if (item == 'warrantyStatus') pos = 4
	else if (item == 'refURL') pos = 5

	// In case cookie doesn't already exist, inster value into new string
	var cookieValue = '';
	for (j=0 ; j < 5; j++) {
		if (j == pos) { strVal = val; } else { strVal = ''; }
		cookieValue += strVal + '~'
	}
	try {
	var cookieData = getCookie("chat");
	var cookieDataArray = cookieData.split("~");
	cookieDataArray[pos] = val;
	cookieValue = cookieDataArray.join("~") 
	}
	catch(err) {}
	setCookie("chat",cookieValue, "","/appletw/2011/",".apple.com","");
}
