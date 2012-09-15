var APIMethod = require('../api_method').create();
var AssetList = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result/rowset');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getAssetList(callback, characterID){
    var apiPath = '/char/AssetList.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getAssetList = getAssetList;
  return this;
};
AssetList.prototype = APIMethod;

var asset_list;

exports.init = function(keyID, vCode, https){
  asset_list = new AssetList(keyID, vCode, https);
}
exports.getAssetList = function(callback, characterID){
  return asset_list.getAssetList(callback, characterID);
}
