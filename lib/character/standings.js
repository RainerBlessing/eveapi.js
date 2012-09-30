var APIMethod = require('../api_method').create();
var Standings = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getStandings(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Standings.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getStandings = getStandings;
  return this;
};
Standings.prototype = APIMethod;

var standings;

exports.init = function(keyID, vCode, https){
  standings = new Standings(keyID, vCode, https);
}
exports.getStandings = function(callback, eventID, characterID){
  return standings.getStandings(callback, eventID, characterID);
}
