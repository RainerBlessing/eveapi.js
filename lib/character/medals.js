var APIMethod = require('../api_method').create();
var Medals = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getMedals(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Medals.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getMedals = getMedals;
  return this;
};
Medals.prototype = APIMethod;

var medals;

exports.init = function(keyID, vCode, https){
  medals = new Medals(keyID, vCode, https);
}
exports.getMedals = function(callback, eventID, characterID){
  return medals.getMedals(callback, eventID, characterID);
}
