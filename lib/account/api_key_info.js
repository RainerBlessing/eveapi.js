var APIKeyInfo = function(keyID, vCode){
  this.prototype = require('../api_method').create();

  var apiPath = '/account/APIKeyInfo.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  var Result = function(APIMethod, xml){
    this.getAPIKeyInfo = function(){
      return xml.get('/eveapi/result').toString();
    }
    
    return this;
  };

  function getAPIKeyInfo(callback){
    this.prototype.getResponse(apiPath, callback, Result);
  } 
 this.getAPIKeyInfo = getAPIKeyInfo;
 return this;
};

var apiKeyInfo;

exports.init = function(keyID, vCode){
  apiKeyInfo = new APIKeyInfo(keyID, vCode);
}
exports.getAPIKeyInfo = function(callback){
  return apiKeyInfo.getAPIKeyInfo(callback);
}
