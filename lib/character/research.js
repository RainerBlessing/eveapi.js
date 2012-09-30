var APIMethod = require('../api_method').create();
var Research = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getResearch(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Research.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getResearch = getResearch;
  return this;
};
Research.prototype = APIMethod;

var research;

exports.init = function(keyID, vCode, https){
  research = new Research(keyID, vCode, https);
}
exports.getResearch = function(callback, eventID, characterID){
  return research.getResearch(callback, eventID, characterID);
}
