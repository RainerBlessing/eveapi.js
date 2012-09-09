var APIMethod = require('../api_method').create();
var Characters = function(keyID, vCode, https){
  var apiPath = '/account/Characters.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  var Result = function(APIMethod, xml){
    var rowsetElements = xml.find('/eveapi/result/rowset');
    var apiResult = require('../api_result').init(this,rowsetElements);
    return this;
  };

  function getCharacters(callback){
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getCharacters = getCharacters;
  return this;
};
Characters.prototype = APIMethod;

var characters;

exports.init = function(keyID, vCode, https){
  characters = new Characters(keyID, vCode, https);
}

exports.getCharacters = function(callback){
  return characters.getCharacters(callback);
}
