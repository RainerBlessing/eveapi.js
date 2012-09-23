var APIMethod = require('../api_method').create();
var CalendarEventAttendees = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getCalendarEventAttendees(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/CalendarEventAttendees.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&eventID='+eventID+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getCalendarEventAttendees = getCalendarEventAttendees;
  return this;
};
CalendarEventAttendees.prototype = APIMethod;

var calendarEventAttendees;

exports.init = function(keyID, vCode, https){
  calendarEventAttendees = new CalendarEventAttendees(keyID, vCode, https);
}
exports.getCalendarEventAttendees = function(callback, eventID, characterID){
  return calendarEventAttendees.getCalendarEventAttendees(callback, eventID, characterID);
}
