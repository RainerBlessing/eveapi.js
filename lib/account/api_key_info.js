var APIMethod = require('../api_method').create();

var APIKeyInfo = function(keyID, vCode, https){
  var apiPath = '/account/APIKeyInfo.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  var Result = function(APIMethod, xml){
    this.getAPIKeyInfo = function(){
      var keyElement = xml.get('/eveapi/result/key');
      var accessMask = keyElement.attr('accessMask');
      var type = keyElement.attr('type');
      var expires = keyElement.attr('expires');
      var key = {
        accessMask: accessMask.value(),
        type: type.value(),
        expires: expires.value()
      }; 
      return key;
    }

      var rowsetElements = xml.find('/eveapi/result/key/rowset');
      var apiResult = require('../api_result').init(this,rowsetElements);

      return this;
  };

  function getAPIKeyInfo(callback){
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
 this.getAPIKeyInfo = getAPIKeyInfo;
 return this;
};
APIKeyInfo.prototype = APIMethod;

var apiKeyInfo;

exports.init = function(keyID, vCode, https){
  apiKeyInfo = new APIKeyInfo(keyID, vCode, https);
}
exports.getAPIKeyInfo = function(callback){
  return apiKeyInfo.getAPIKeyInfo(callback);
}
