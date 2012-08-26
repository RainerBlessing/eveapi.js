var https = require('https');
var libxmljs = require("libxmljs");
var DateFormat = require('dateformatjs').DateFormat;

var APIMethod = function(apiPath){

  var optionsget = {
    host : 'api.eveonline.com',
    port : 443,
    path : apiPath
  }; 


  parseDateString : function(dateString){
    var dateFormat = new DateFormat('yyyy-MM-dd HH:mm:ss K z'); 
    return dateFormat.parse(dateString);
  },

  getDateString : function(xml, xPath){
    return xml.get(xPath).text()+' UTC +0';
  },

  getNumber : function(xml, xPath){
    return new Number(parseInt(xml.get(xPath).text()));
  },

  getResponse : function(callback, Result){
        var reqGet = https.get(optionsget, function(res) {
      console.log("statusCode: ", res.statusCode);

      res.on('data', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');

        var xml = libxmljs.parseXmlString(d.toString('utf-8'));
     
        var response = function(APIMethod,xml){
          this.getCurrentTime = function getCurrentTime(){
            var dateString = APIMethod.getDateString(xml,'/eveapi/currentTime');
            return APIMethod.parseDateString(dateString);
          }
          this.getCachedUntil = function getCachedUntil(){
            var dateString = APIMethod.getDateString(xml, '/eveapi/cachedUntil');
            return APIMethod.parseDateString(dateString);
          }
          this.getResult = function getResult(){
            return new Result(APIMethod,xml);
          }
          return this;
        }.call({},APIMethod,xml);

        callback(response);
      });
    });

    reqGet.on('error', function(e) {
      console.error(e);
    });

  },

};

exports.create = function(apiPath){
  return APIMethod;
}
