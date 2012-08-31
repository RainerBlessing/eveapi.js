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
    this.getRowset = function(){
      var rowsetElements = xml.find('/eveapi/result/key/rowset');
      var i,j,k;
      var rowsetElement, rowsets, name, key, columns;

      var rowElement, rows, row, columnAttribute;

      rowsets=[];
      for(i=0;i<rowsetElements.length;i++){
        rowsetElement = rowsetElements[i];
        name = rowsetElement.attr('name').value();  
        key = rowsetElement.attr('key').value();  
        columns = rowsetElement.attr('columns').value().split(',');  

        var rowElements = rowsetElements[i].find('row');
        
        for(j=0;j<rowElements.length;j++){
          rowElement = rowElements[j];
          rows = [];
          row = {};

          for(k=0;k<columns.length;k++){
            columnAttribute = rowElement.attr(columns[k]);
            row[columnAttribute.name()]= columnAttribute.value(); 
          }
          rows.push(row); 
        }
        rowsets[name] = rows;
      }
      return rowsets;
    } 
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
