var libxmljs = require("libxmljs");
var DateFormat = require('dateformatjs').DateFormat;

var APIMethod = function(apiPath, https){

  https = (https === undefined ? require('https') : https);
  var apiMethod = this;
  var optionsget = {
    host : 'api.eveonline.com',
    port : 443,
    path : apiPath
  }; 

  this.parseDateString = function(dateString){
    var dateFormat = new DateFormat('yyyy-MM-dd HH:mm:ss K z'); 
    return dateFormat.parse(dateString);
  }

  this.getDateString = function(xml, xPath){
    return xml.get(xPath).text()+' UTC +0';
  }

  this.getNumber = function(xml, xPath){
    return new Number(parseInt(xml.get(xPath).text()));
  }

  this.getResponse = function(callback, Result){
        var reqGet = https.get(optionsget, function(res) {
      console.log("statusCode: ", res.statusCode);

      res.on('data', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');

        var xml = libxmljs.parseXmlString(d.toString('utf-8'));
     
        var response = function(apiMethod, xml){
          this.getCurrentTime = function getCurrentTime(){
            var dateString = apiMethod.getDateString(xml,'/eveapi/currentTime');
            return apiMethod.parseDateString(dateString);
          }
          this.getCachedUntil = function getCachedUntil(){
            var dateString = apiMethod.getDateString(xml, '/eveapi/cachedUntil');
            return apiMethod.parseDateString(dateString);
          }
          this.getResult = function getResult(){
            return new Result(APIMethod,xml);
          }
          return this;
        }.call(this, apiMethod, xml);
        callback(response);
      });
    });
    reqGet.on('error', function(e) {
      console.error(e);
    });

  }

};

exports.create = function(){
  return APIMethod;
}
