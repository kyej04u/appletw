GetWarrantyModule = Class.create();

GetWarrantyModule.prototype = {
	
	'killSwitch': undefined,  // true or undefined
	
	'serverUrl': undefined,	// Testing URL
	
	
	'initialize': function() {

		// use this code to disable the module and all its callback methods
		// parent.killSwitch = true; 
		// or you can do it selectively
		// if (location.href.match('/ipod/')) parent.killSwitch = true;

		// kill it if the module html is missing
		if (!$('warrantycheckpsp')) parent.killSwitch = true;

		// don't go any further if killSwitch is on
		if (parent.killSwitch || this.killSwitch) return;
		
		parent.serverUrl = 'https://selfsolve.apple.com/';	// Production URL
		
		// stop the form from being submitted
		Event.observe($('serialnumbercheck'), 'submit', function(evt) { Event.stop(evt); });
		Event.observe($('serialnumbercheck').select('form').first(), 'submit', function(evt) { Event.stop(evt); });


		// initialize the warranty status module, for both user-initiated and cookie-initiated cases
		// cookie-initiated requests happen automatically on page load, so we must provide callbacks 
		// and handle results and errors even if we don't show the module on the page
		if (warrantyChecker==undefined) {
			// instantiate warranty checker with cookies off (pass true to turn cookies on)
			warrantyChecker = new WarrantyChecker(false);
		}

		var sRequestUrl = '';
		if (ACWPod.getLocale() == 'zh_CN') {
			sRequestUrl = parent.serverUrl + 'warrantyChecker.do?lang=cn';
		}
		else {
			sRequestUrl = parent.serverUrl + 'warrantyChecker.do';
		}
		this.oWarranty = warrantyChecker.processRequest( 'serialnumber', 'getwarrantysubmitbutton', this.showErrors, this.showSpinner, errMsgData, this.getWarrantyStatus, this.onFailure, sRequestUrl);

		// ok now we're good to go
		this.renderKeys();
		$('warrantycheckpsp').show();
		
		var snCookie = cookieJar.getCookie('ac_ags');
		var params = location.href.toQueryParams();
		if (params.newid || snCookie==undefined || snCookie=='') {
			$('serialnumbercheck').show();
		} else {
			$('cookiespinner').show();
			var cookieletVal = cookieJar.getCookieletValue(snCookie, "id");
			//warrantyChecker.submitRequestFromUrl(cookieletVal, warrantyChecker.WCResponse, warrantyChecker.defaultClientFailureCB);
			warrantyChecker.submitRequestFromUrl(cookieletVal, warrantyChecker.WCResponse, this.showErrors);
		}

	},

	'renderKeys': function() {

		// access keys as an array based on locale or language
		var locale = ACWPod.getLocale();
		var lang = ACWPod.getLang();
		var keyObj = eval('keys.' + locale);
		if (keyObj == null) keyObj = eval('keys.' + lang);
		if (keyObj == null) keyObj = keys.en; // default to en if lang not found

		// look for all elements of type=key and update with named key
		aElem = $('warrantycheckpsp').getElementsBySelector('[type=key]');
		for(var i=0; i<aElem.length; i++) {
			var keyName = aElem[i].readAttribute('name');
			try {
				aElem[i].update(keyObj[keyName]);
			}
			catch (err) {
				// don't show error
			}
		}
		
		// set error messages
		errMsgData.errEmpty = keyObj['wc.check.err.front.serialnumberrequired'];
		errMsgData.errLength = keyObj['wc.check.err.front.serialnumbercharacterlengthinvalid'];
		errMsgData.errChar = keyObj['wc.check.err.front.serialnumbercharacterinvalid'];
	},

	'showSpinner': function() {

		$('warrantycheckspinner').show();
	},
	
	'showErrors': function(msg) {
		$('serialnumber').value = "";
		$('warrantycheckspinner').hide();
		$('cookiespinner').hide();
		$('serialnumbercheck').show();
		
		var snCookie = cookieJar.getCookie('ac_ags');
		if (snCookie==undefined || snCookie=='') {
			// show error if no cookie
			$('errorDiv').show();
			$('error').update(msg);
		} 
		else {
			// clear the cookie which caused the error
			cookieJar.deleteCookie('ac_ags', "/appletw/2011/", ".apple.com", null);
		}
	},
	
	'getWarrantyStatus': function(responseObj) {

		if (parent.killSwitch) return;

		var json = responseObj;
		
		// update product information
		var prodImg = '<img src="' + json.getProductImageUrl() + '">';
		$('productimage').update(prodImg);
		$('productname').update(json.getProductDescription());
		if(json.getIsIMEINum()) {
			$('imeiLabel').show();
			$('productsn').update(json.getAPIMEINum());
		}
		else {
			$('snLabel').show();
			$('productsn').update(json.getSerialNumber());
		}

		// footnote
		// needs to be first - following code may expect or modify elements in the footnote
		if (json.getFootnoteText()) {
			$('footnote').update(json.getFootnoteText());
			$('footnote').show();
		}

		// check if iphone and not activated
		if (json.getIsIphoneFlag() && !json.getIphoneActive()) {
			
			$('registration-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_yellow.png');
			$('activation-false').show();
			$('registration-text').update(json.getIphoneNotActivatedContent());
			$('serviceoptions-button').show();
			Event.observe('serviceoptions-button', 'click', function() {
				window.location.href=json.getIphoneNotActivatedBtnLink();
			});
			$('phone').hide();
			$('hardware').hide();
			$('app').hide();
		}
		else if (!json.getIsRegistered()) {
			// product is not registered
			$('registration-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_yellow.png');
			$('registration-false').show();
			$('registration-button').show();
			Event.observe('registration-button', 'click', function() {
				if (ACWPod.getLocale() == "zh_CN") {
					window.location.href = parent.serverUrl + 'pages/pod.jsp?r=GetProductDetails.do&lang=cn&productRegister=Y&country=' + json.getCountryCode() + '&id='+ ((json.getIsIMEINum()) ? json.getAPIMEINum() : json.getSerialNumber());
				}
				else {
					window.location.href = parent.serverUrl + 'GetProductDetails.do?productRegister=Y&country=' + json.getCountryCode() + '&id='+ ((json.getIsIMEINum()) ? json.getAPIMEINum() : json.getSerialNumber());
				}
			});
			$('phone').hide();
			$('hardware').hide();
			$('app').hide();
			$('registration-text').update(json.getRegisteredOrNotRegisteredText('short'));
		}
		else { 
			// registered
			// no need to show registration message
			$('registration').hide();
		}

		// phone coverage
		$('phone-subheader').update(json.getPhoneSupportSubHeader());
		if (json.getPhoneSupportHasCoverage()) {
			$('phone-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_green.png')
		}
		else {
			$('phone-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_yellow.png')
		}
		Event.observe('phone-button', 'click', function()
		{
			window.location.href=json.getPhoneSupportLink(); 
		});

		// hardware coverage
		$('hardware-subheader').update(json.getHWRepairSubHeader());
		if (json.getHWSupportHasCoverage()) {
			$('hardware-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_green.png')
		} 
		else {
			$('hardware-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_yellow.png');
		}

		if($('hardware-epop')){
			Event.observe('hardware-epop', 'click', function(evt)
			{
				if (ACWPod.getLocale() == "zh_CN") {
					window.open(parent.serverUrl + 'pages/pod.jsp?r=Dispute.do&lang=cn&transType=Warranty_Checker&sn=' + (json.getIsIMEINum() ? json.getAPIMEINum() : json.getSerialNumber()));
				}
				else {
					window.open(parent.serverUrl + 'Dispute.do?transType=Warranty_Checker&sn=' + (json.getIsIMEINum() ? json.getAPIMEINum() : json.getSerialNumber()));
				}
				evt.stop();
			});
			
		}

		Event.observe('hardware-button', 'click', function(evt)
		{
			if (ACWPod.getLocale() == "zh_CN") {
				window.location.href = parent.serverUrl + 'pages/pod.jsp?r=GetWarranty.do&lang=cn&sn=' + (json.getIsIMEINum() ? json.getAPIMEINum() : json.getSerialNumber()) + '&cn=' + json.getCountryCode();
			}
			else {
				window.location.href = parent.serverUrl + 'GetWarranty.do?sn=' + (json.getIsIMEINum() ? json.getAPIMEINum() : json.getSerialNumber()) + '&cn=' + json.getCountryCode();
			}
			evt.stop();
		});


		
		// app eligibity
		$('app-subheader').update(json.getEligibilitySubHeader());
		if (json.getIsAPPEligible()) {
			$('app-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_yellow.png')
			var id = json.getSerialNumber();
			if(json.getIsIMEINum())
				id = json.getAPIMEINum();
			Event.observe('app-button', 'click', function()
			{ 
				if (ACWPod.getLocale() == "zh_CN") {
					window.location.href = parent.serverUrl + 'pages/pod.jsp?r=AgrOfferFlow.do&lang=cn&country=' + json.getCountryCode()  + '&id=' + id + '&AGR_TYPE=' + json.getAgreementPurchaseType() + '&AGR_TEMP_ID=' + json.getAPPTemplateId();
				}
				else {
					window.location.href = parent.serverUrl + 'AgrOfferFlow.do?country=' + json.getCountryCode()  + '&id=' + id + '&AGR_TYPE=' + json.getAgreementPurchaseType() + '&AGR_TEMP_ID=' + json.getAPPTemplateId();
				}
			});
		}
		else if (json.getHWSupportCoverageValue()=='PP') {
			$('app-icon').writeAttribute('src', 'http://images.apple.com/support/applecare/images/warranty_status_green.png')
			// covered by APP, hide button
			$('app-button').hide();
		} 
		else {
			// hide the entire row
			$('app').hide();
		}

		// link to full coverage details
		if (json.getIsRegistered()) {
			// product is registered
			$('fullcoverage').show();

			Event.observe('coverage-button', 'click', function(evt)
			{
				if (ACWPod.getLocale() == "zh_CN") {
					window.location.href = parent.serverUrl + 'pages/pod.jsp?r=agreementWarrantyDynamic.do&lang=cn&sn=' + (json.getIsIMEINum() ? json.getAPIMEINum() : json.getSerialNumber());
				}
				else {
					window.location.href = parent.serverUrl + 'agreementWarrantyDynamic.do?sn=' + (json.getIsIMEINum() ? json.getAPIMEINum() : json.getSerialNumber());
				}
				evt.stop();
			});
		}


		// reset UI
		$('warrantycheckspinner').hide();
		$('cookiespinner').hide();
		$('errorDiv').hide()
		$('serialnumbercheck').hide()

		// show product & coverage info
		$('product').show();
		$('results').show();

	},

	onFailure: function() { 

		if (parent.killSwitch) return;

		// werver error
		$('warrantycheckspinner').hide();
		$('cookiespinner').hide();
		//alert('Server error. Please try again.');
		$('serialnumber').activate();
	},
	
	checkAnotherSN: function() {
		
		// use browser detection to force a reload in IE6 & 7 & 8
		// since we will lose newID=Y in the url, we also clear the cookie, if any
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { // test for MSIE x.x;
			var IEVersion = new Number(RegExp.$1) // capture x.x portion and store as a number
		 	if (IEVersion <= 8) {
				cookieJar.deleteCookie('ac_ags', "/appletw/2011/", ".apple.com", null);
				window.location.reload(true);
			}
		} 
		else {
			// just reload the page normally like normal people
			window.location.href = 'index.html?newID=Y';
		}
	}

}

var getWarrantyModule, warrantyChecker;
var errMsgData = { 'errEmpty' : '', 'errLength' : '', 'errChar' : '' };


Event.observe(window, 'load', function() {
	
	// *** need omniture tracking here?

	// create and initialize the page
	if (getWarrantyModule == undefined) {
		getWarrantyModule = new GetWarrantyModule();
	}

});
