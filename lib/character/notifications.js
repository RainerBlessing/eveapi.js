var APIMethod = require('../api_method').create();
var Notifications = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getNotifications(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Notifications.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getNotifications = getNotifications;
  return this;
};
Notifications.prototype = APIMethod;

var notifications;

exports.init = function(keyID, vCode, https){
  notifications = new Notifications(keyID, vCode, https);
}
exports.getNotifications = function(callback, eventID, characterID){
  return notifications.getNotifications(callback, eventID, characterID);
}
