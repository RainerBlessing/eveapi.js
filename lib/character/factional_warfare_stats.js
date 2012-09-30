var APIMethod = require('../api_method').create();
var FactionalWarfareStats = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getFactionalWarfareStats(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/FacWarStats.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getFactionalWarfareStats = getFactionalWarfareStats;
  return this;
};
FactionalWarfareStats.prototype = APIMethod;

var factional_warfare_stats;

exports.init = function(keyID, vCode, https){
  factional_warfare_stats = new FactionalWarfareStats(keyID, vCode, https);
}
exports.getFactionalWarfareStats = function(callback, eventID, characterID){
  return factional_warfare_stats.getFactionalWarfareStats(callback, eventID, characterID);
}
