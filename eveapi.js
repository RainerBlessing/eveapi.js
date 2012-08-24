var https = require('https');
var libxmljs = require("libxmljs");

var EveApi = function(callback, keyID, vCode){
 
  var optionsget = {
	host : 'api.eveonline.com',
	port : 443,
	path : '/account/AccountStatus.xml.aspx?keyID='+keyID+'&vCode='+vCode, // the rest of the url with parameters if needed
  }; 

  function getAccountStatus(){
    // do the GET request
    var reqGet = https.get(optionsget, function(res) {
      console.log("statusCode: ", res.statusCode);
      // uncomment it for header details
      // console.log("headers: ", res.headers);


      res.on('data', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');

        var xml = libxmljs.parseXmlString(d.toString('utf-8'));

        var requestInfo = (function(xml){
          this.getCurrentTime = function getCurrentTime(){
            return xml.get('/eveapi/currentTime').text();
          }
          return this;
        })(xml);
        callback(requestInfo);
      });
    });

    reqGet.on('error', function(e) {
      console.error(e);
    });

  } 

  this.getAccountStatus = getAccountStatus;
  return this;
};

exports.create = function create(callback, keyID, vCode){
 var eveApi= new EveApi(callback, keyID, vCode);
 return eveApi;
}
