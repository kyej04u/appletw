<!--
url = new String(document.location)
pathSplit = url.split('/appletw/2011/');
basePath='/appletw/2011/';
for (i=3;i<pathSplit.length;i++) {
   j = pathSplit[i];
   if (j != '' && j.indexOf('.')==-1) {
      basePath += j;
      if (j=='support') break;
      basePath += '/appletw/2011/';
   }
}

// English Message Strings

var monthNames = new Array("","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var checkButton = "Submit";
var waitMsg = 'One moment, please... <img src="http://images.apple.com/support/main/elements/aqua2spinner12.gif" width="12" height="12" align="absmiddle">';
var noInfo  = '<span style="color: #700">No info found. Please try again.</span>';
var timeOut = '<span style="color: #700">We&#145;re sorry, the system is not responding at this time.</span>';
var legaldisclaimer = '<a href="'+basePath+'/service/help/warrantycheck/">Learn more about this information</a>';
var introDownMsg = '<span style="color:#800">This feature is temporarily unavailable due to system maintenance.<br></span>';
var introMsg = 'Enter your hardware serial number to find out what coverage is available for your product:';



var titleMsg = 'About Your Support Coverage';
var titleMsg2 = 'About your Apple product';
var helpMsg = '<div class="help right"><a href="'+basePath+'/service/help/warrantycheck/">Help</a></div>';
try {
   if (!whereSnUrl) {
      var whereSnUrl = 'http://docs.info.apple.com/article.html?artnum=300191'; // iMac G5 default
   }
}
catch(err) {
    var whereSnUrl = 'http://docs.info.apple.com/article.html?artnum=300191'; // iMac G5 default
}
var whereSnMsg = 'Where do I find my serial number?';
var snNotRecognized = '<div id="checkserial"><a href = basePath+"/service/help/warrantycheck/">My serial number is not recognized</a></div>';

var spMsg = 'Our records indicate that your product is covered under one of our special agreements. For information about your coverage, please <a href="http://www.apple.com/support/contact/phone_contacts.html">contact us</a>.';

var ccMsg = spMsg;
var csMsg = spMsg;
var liMsg = 'Apple&#146;s Limited Warranty';
var paMsg = spMsg;
var ppxMsg = 'the AppleCare Premium Service and Support Plan';
var ppMsg = 'the AppleCare Protection Plan';
var raMsg = spMsg;
var reMsg = spMsg;
var estMsg = ' estimated';

var regMsg = 'You can update our records with your date of purchase by clicking <a href="'+basePath+'/service/help/warrantycheck/">here</a>.<p>Please put your sales receipt in a safe place. You will need it for warranty validation.</p>';
var learnMsg = '<div class="another">Extend your service and technical support coverage today. <a href="'+basePath+'/products/">Learn more</a></div>';
var legacyMsg = '<div class="another">Check out our new products! The <a href="http://store.apple.com/">Apple Store</a> has great deals.</div>';
var anotherSnMsg = '<div class="another"><a href="javascript:writeForm(\'\');">Enter another serial number</a></div>';

var noSerialAlert = 'You must enter a serial number!';
var spacesSerialAlert = 'A serial number cannot have spaces in it!';
var validSerialAlert = 'Please enter a valid serial number.';

var replaceOsAlert = "Apple does not use the letter 'O' in its serial numbers. For your convenience, we replaced all 'O's with zeros.";


// translate in context

var purchaseStr_1_1= '<div class="clearest"></div>Our records indicate that your product is covered under ';
//  coverage
var purchaseStr_1_2= '.';
//  estimated
var purchaseStr_1_3=' This coverage is estimated to expire on <b>';
//  datePurchased
var purchaseStr_1_4='</b>. ';

var purchaseStr_2_1= '<div class="clearest"></div>Our records indicate that your';
//  estimated
var purchaseStr_2_2= ' date of purchase was <b>';
//  datePurchased
var purchaseStr_2_3= '</b>. ';

var purchaseStr_3_1= '<div class="clearest"></div>Our records indicate that your product is covered under ';
//  coverage
var purchaseStr_3_2= '.';

var purchaseStr_4_1= '<div class="clearest"></div>We are unable to provide support coverage information as our records do not have your product&#146;s date of purchase. ';

var returnMsg1 = 'Our records indicate that your product is covered for 90 days from your most recent service. ';
var returnMsg2 = '</p><p>Our records indicate that your product is not covered for service. ';

var returnMsg4 = '</p><p>If today is exactly one year from your estimated date of purchase and you require service, please contact <a href="/contact/">AppleCare</a> for assistance. ';


// translate in context
var returnMsg3a = '</p><p>Our records indicate that your product has service coverage for <b>';
//  daysRemaining
var returnMsg3b = '</b> more days.';
var returnMsg3b1 = '</b>.';
var returnMsg3e = '<p>If you believe that this information is inaccurate, learn how to <a href="'+basePath+'/service/help/warrantycheck/">update your coverage date</a>.</p><p>Please put your sales receipt in a safe place. You will need it for warranty validation.</p>';
var returnMsg3f = '<p>If you believe that this information is inaccurate, learn how to <a href="'+basePath+'/service/help/warrantycheck/">update your coverage date</a>.</p><p>Please put your sales receipt in a safe place. You will need it for warranty validation.</p>';
var returnMsg3c = '<p>Purchase the <a href="'+basePath+'/products/">AppleCare Protection Plan</a></p>';
var returnMsg3d = '<p>Purchase <a href="'+basePath+'/products/">AppleCare Premium Service & Support</a></p>';

// translate in context
var supportRef_1_1 = '<div class="bodytext">Visit the <a href="'+basePath;
// shortProdURL e.g. powermac
var supportRef_1_2 = ' support</a> page';
// shortProdTitle e.g. Power Mac G5

//-->

