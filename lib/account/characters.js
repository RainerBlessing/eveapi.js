var APIMethod = require('../api_method').create();
var Characters = function(keyID, vCode){
  var apiPath = '/account/Characters.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  APIMethod.call(this,apiPath);

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result/rowset');
      this.getRowset = require('../api_result').getRowsetFunction(rowsetElements);
      return this;
  };

  function getCharacters(callback){
    this.getResponse(callback, Result);
  } 
 this.getCharacters = getCharacters;
 return this;
};
Characters.prototype = APIMethod;

var apiKeyInfo;

exports.init = function(keyID, vCode){
  characters = new Characters(keyID, vCode);
}
exports.getCharacters = function(callback){
  return characters.getCharacters(callback);
}
