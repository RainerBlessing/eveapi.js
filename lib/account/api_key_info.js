var APIKeyInfo = function(keyID, vCode){

  var apiPath = '/account/APIKeyInfo.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  var Result = function(APIMethod, xml){
    this.getAPIKeyInfo = function(){
      return xml.get('/eveapi/result').toString();
    }
    
    return this;
  };

  function getAPIKeyInfo(callback){
    this.getResponse(apiPath, callback, Result);
  } 
 this.getAPIKeyInfo = getAPIKeyInfo;
 return this;
};

APIKeyInfo.prototype = require('../api_method').create();

var apiKeyInfo;

exports.init = function(keyID, vCode){
  apiKeyInfo = new APIKeyInfo(keyID, vCode);
}
exports.getAPIKeyInfo = function(callback){
  return apiKeyInfo.getAPIKeyInfo(callback);
}
