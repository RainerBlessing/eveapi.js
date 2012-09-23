var APIMethod = require('../api_method').create();
var ContactList = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getContactList(callback, characterID){
    var apiPath = '/char/ContactList.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getContactList = getContactList;
  return this;
};
ContactList.prototype = APIMethod;

var context_list;

exports.init = function(keyID, vCode, https){
  context_list = new ContactList(keyID, vCode, https);
}
exports.getContactList = function(callback, characterID){
  return context_list.getContactList(callback, characterID);
}
