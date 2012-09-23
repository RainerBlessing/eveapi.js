var APIMethod = require('../api_method').create();
var CharacterSheet = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getCharacterSheet(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/CharacterSheet.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&eventID='+eventID+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getCharacterSheet = getCharacterSheet;
  return this;
};
CharacterSheet.prototype = APIMethod;

var characterSheet;

exports.init = function(keyID, vCode, https){
  characterSheet = new CharacterSheet(keyID, vCode, https);
}
exports.getCharacterSheet = function(callback, eventID, characterID){
  return characterSheet.getCharacterSheet(callback, eventID, characterID);
}
