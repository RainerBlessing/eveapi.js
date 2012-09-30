var APIMethod = require('../api_method').create();
var NotificationTexts = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getNotificationTexts(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/NotificationTexts.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getNotificationTexts = getNotificationTexts;
  return this;
};
NotificationTexts.prototype = APIMethod;

var notification_texts;

exports.init = function(keyID, vCode, https){
  notification_texts = new NotificationTexts(keyID, vCode, https);
}
exports.getNotificationTexts = function(callback, eventID, characterID){
  return notification_texts.getNotificationTexts(callback, eventID, characterID);
}
