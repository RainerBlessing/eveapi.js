var https = require('https');
var libxmljs = require("libxmljs");
var DateFormat = require('dateformatjs').DateFormat;

var AccountStatus = function(keyID, vCode){
  var optionsget = {
	host : 'api.eveonline.com',
	port : 443,
	path : '/account/AccountStatus.xml.aspx?keyID='+keyID+'&vCode='+vCode,
  }; 

  var AccountStatus = function(xml){
    this.getPaidUntil = function(){
      var dateString = getDateString(xml, '/eveapi/result/paidUntil');
      return parseDateString(dateString);
    }
    this.getCreateDate = function(){
      var dateString = getDateString(xml, '/eveapi/result/createDate');
      return parseDateString(dateString);
    }
    this.getLogonCount = function(){
      return getNumber(xml, '/eveapi/result/logonCount');
    }
    this.getLogonMinutes = function(){
      return getNumber(xml, '/eveapi/result/logonMinutes');
    }
    return this;
  };

  function parseDateString(dateString){
    var dateFormat = new DateFormat('yyyy-MM-dd HH:mm:ss K z'); 
    return dateFormat.parse(dateString);
  }

  function getDateString(xml, xPath){
    return xml.get(xPath).text()+' UTC +0';
  }

  function getNumber(xml, xPath){
    return new Number(parseInt(xml.get(xPath).text()));
  }

  function getAccountStatus(callback){
    var reqGet = https.get(optionsget, function(res) {
      console.log("statusCode: ", res.statusCode);

      res.on('data', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');

        var xml = libxmljs.parseXmlString(d.toString('utf-8'));

        var response = (function(xml){
          this.getCurrentTime = function getCurrentTime(){
            var dateString = getDateString(xml,'/eveapi/currentTime');
            return parseDateString(dateString);
          }
          this.getCachedUntil = function getCachedUntil(){
            var dateString = getDateString(xml, '/eveapi/cachedUntil');
            return parseDateString(dateString);
          }
          this.getResult = function getResult(){
            return new AccountStatus(xml);
          }
          return this;
        })(xml);
        callback(response);
      });
    });

    reqGet.on('error', function(e) {
      console.error(e);
    });

  } 
 this.getAccountStatus = getAccountStatus;
 return this;
};

var accountStatus;

exports.init = function(keyID, vCode){
  accountStatus = new AccountStatus(keyID, vCode);
}
exports.getAccountStatus = function(callback){
  return accountStatus.getAccountStatus(callback);
}
