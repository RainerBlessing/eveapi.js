var APIMethod = require('../api_method').create();
var ContactNotifications = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getContactNotifications(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/ContactNotifications.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getContactNotifications = getContactNotifications;
  return this;
};
ContactNotifications.prototype = APIMethod;

var contactNotifications;

exports.init = function(keyID, vCode, https){
  contactNotifications = new ContactNotifications(keyID, vCode, https);
}
exports.getContactNotifications = function(callback, eventID, characterID){
  return contactNotifications.getContactNotifications(callback, eventID, characterID);
}
