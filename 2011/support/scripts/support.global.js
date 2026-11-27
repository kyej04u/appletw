var ACWCookie = {
	'set': function(name, value, path, domain, expire) {
		var this_path = '';
		if (path != undefined) {
			this_path = '; path=' + path;
		}
		var this_domain = '';
		if (domain != undefined) {
			this_domain = '; domain=' + domain;
		}
		var this_expire = '';
		if (expire != undefined) {
			var d = new Date();
			d.setTime(d.getTime() + (86400000 * parseFloat(expire)));
			this_expire = '; expires=' + d.toGMTString();
		}
		return (document.cookie = name + '=' + value + this_path + this_domain + this_expire);
	},
	'get': function(name) {
		var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
		return (cookie ? unescape(cookie[2]) : null);
	},
	'erase': function(name) {
		var cookie = ACWCookie.get(name) || true;
		ACWCookie.set(name, '', '', '', -1);
		return cookie;
	},
	'accept': function() {
		if (typeof navigator.cookieEnabled == 'boolean') {
			return navigator.cookieEnabled;
		}
		ACWCookie.set('_test', '1');
		return (ACWCookie.erase('_test') === '1');
	}
};

var ACWPod = {
	'get': function() {
		return ACWCookie.get('POD');
	},
	'getAppleDomain': function() {
		return (location.hostname.indexOf('apple.com.cn') != -1) ? '.apple.com.cn' : '.apple.com';
	},
	'getCountry': function() {
		if (this.parse() != null) {
			return this.parse()[0].toUpperCase();
		}
		else {
			return 'US';
		}
	},
	'getDirectory': function() {
		if (window.location.hostname == 'www.apple.com.cn') {
			return 'cn';
		}
		else {
			var dir = /^\/?([a-z]*\/?[a-z]*)\/support\//.exec(window.location.pathname);
			return (dir != null) ? dir[1] : undefined;
		}
	},
	'getLang': function() {
		if (this.parse() != null) {
			return this.parse()[1].toLowerCase();
		}
		else {
			return 'en';
		}
	},
	'getLocale': function() {
		if (this.parse() != null) {
			return this.getLang() + '_' + this.getCountry();
		}
		else {
			return 'en_US';
		}
	},
	'isTier0': function() {
		return (this.getLang() == 'en' || this.getLang() == 'de' || this.getLang() == 'fr' || this.getLang() == 'ja') ? true : false;
	},
	'parse': function() {
		var pod = ACWCookie.get('POD');
		if (pod != null && pod != undefined && pod != '' && pod.include('~')) {
			return pod.split('~');
		}
		else {
			return null;
		}
	},
	'set': function(pod) {
		ACWCookie.set('POD', pod, '/appletw/2011/', this.getAppleDomain(), 28);
	}
};

/* Deprecated functions */

var Pod = {
	'getLocale': function() {
		return ACWPod.getLocale();
	}
};

function setPOD(str){
	var today = new Date();
	var expiry = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000); // plus 28 days
	var expireVal = expiry.toGMTString();
	document.cookie = "POD=" + str + "; path=/; domain=" + ACWPod.getAppleDomain() + "; expires=" + expireVal;
}

var ACUtilbar = {
	'showMore' : function(query) {
		if ($('g-search')) {
			if ($('g-search')['bucket']) {
				$('g-search')['bucket'].value = 'psp';
			}
			if ($('g-search')['activity']) {
				$('g-search')['activity'].value = 'more';
			}
			if (query != undefined) {
				if ($('g-search')['val']) {
					$('g-search')['val'].value = query;
				}
				if ($('g-search')['q']) {
					$('g-search')['q'].value = query;
				}
			}
			else if (typeof(ACKeyword) != 'undefined') {
				if ($('g-search')['val']) {
					$('g-search')['val'].value = ACKeyword;
				}
				if ($('g-search')['q']) {
					$('g-search')['q'].value = ACKeyword;
				}
			}
			$('g-search').submit();
		}
	}
};
