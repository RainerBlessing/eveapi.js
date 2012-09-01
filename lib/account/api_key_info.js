var APIMethod = require('../api_method').create();
var APIKeyInfo = function(keyID, vCode){
  var apiPath = '/account/APIKeyInfo.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  APIMethod.call(this,apiPath);

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
      this.getRowset = require('../api_result').getRowsetFunction(rowsetElements);
      return this;
  };

  function getAPIKeyInfo(callback){
    this.getResponse(callback, Result);
  } 
 this.getAPIKeyInfo = getAPIKeyInfo;
 return this;
};
APIKeyInfo.prototype = APIMethod;

var apiKeyInfo;

exports.init = function(keyID, vCode){
  apiKeyInfo = new APIKeyInfo(keyID, vCode);
}
exports.getAPIKeyInfo = function(callback){
  return apiKeyInfo.getAPIKeyInfo(callback);
}
