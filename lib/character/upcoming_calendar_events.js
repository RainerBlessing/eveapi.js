var APIMethod = require('../api_method').create();
var UpcomingCalendarEvents = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getUpcomingCalendarEvents(callback, characterID){
    var apiPath = '/char/UpcomingCalendarEvents.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getUpcomingCalendarEvents = getUpcomingCalendarEvents;
  return this;
};
UpcomingCalendarEvents.prototype = APIMethod;

var upcomingCalendarEvents;

exports.init = function(keyID, vCode, https){
  upcoming_calendar_events = new UpcomingCalendarEvents(keyID, vCode, https);
}
exports.getUpcomingCalendarEvents = function(callback, characterID){
  return upcoming_calendar_events.getUpcomingCalendarEvents(callback, characterID);
}
