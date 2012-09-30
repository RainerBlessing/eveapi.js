var APIMethod = require('../api_method').create();
var KillLog = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getKillLog(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Killlog.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getKillLog = getKillLog;
  return this;
};
KillLog.prototype = APIMethod;

var kill_log;

exports.init = function(keyID, vCode, https){
  kill_log = new KillLog(keyID, vCode, https);
}
exports.getKillLog = function(callback, eventID, characterID){
  return kill_log.getKillLog(callback, eventID, characterID);
}
