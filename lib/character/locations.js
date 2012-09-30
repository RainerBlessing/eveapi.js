var APIMethod = require('../api_method').create();
var Locations = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getLocations(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Locations.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getLocations = getLocations;
  return this;
};
Locations.prototype = APIMethod;

var locations;

exports.init = function(keyID, vCode, https){
  locations = new Locations(keyID, vCode, https);
}
exports.getLocations = function(callback, eventID, characterID){
  return locations.getLocations(callback, eventID, characterID);
}
