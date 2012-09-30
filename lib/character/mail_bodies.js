var APIMethod = require('../api_method').create();
var MailBodies = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getMailBodies(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/MailBodies.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getMailBodies = getMailBodies;
  return this;
};
MailBodies.prototype = APIMethod;

var mail_bodies;

exports.init = function(keyID, vCode, https){
  mail_bodies = new MailBodies(keyID, vCode, https);
}
exports.getMailBodies = function(callback, eventID, characterID){
  return mail_bodies.getMailBodies(callback, eventID, characterID);
}
