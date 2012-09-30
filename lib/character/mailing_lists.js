var APIMethod = require('../api_method').create();
var MailingLists = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getMailingLists(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/MailingLists.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getMailingLists = getMailingLists;
  return this;
};
MailingLists.prototype = APIMethod;

var mailing_lists;

exports.init = function(keyID, vCode, https){
  mailing_lists = new MailingLists(keyID, vCode, https);
}
exports.getMailingLists = function(callback, eventID, characterID){
  return mailing_lists.getMailingLists(callback, eventID, characterID);
}
