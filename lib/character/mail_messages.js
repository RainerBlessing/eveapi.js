var APIMethod = require('../api_method').create();
var MailMessages = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getMailMessages(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/MailMessages.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getMailMessages = getMailMessages;
  return this;
};
MailMessages.prototype = APIMethod;

var mail_messages;

exports.init = function(keyID, vCode, https){
  mail_messages = new MailMessages(keyID, vCode, https);
}
exports.getMailMessages = function(callback, eventID, characterID){
  return mail_messages.getMailMessages(callback, eventID, characterID);
}
