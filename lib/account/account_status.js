var APIMethod = require('../api_method').create();
var AccountStatus = function(keyID, vCode){
  var apiPath = '/account/AccountStatus.xml.aspx?keyID='+keyID+'&vCode='+vCode;
  var accountStatus = this;

  var Result = function(APIMethod,xml){
    this.getPaidUntil = function(){
      var dateString = accountStatus.getDateString(xml, '/eveapi/result/paidUntil');
      return accountStatus.parseDateString(dateString);
    }
    this.getCreateDate = function(){
      var dateString = accountStatus.getDateString(xml, '/eveapi/result/createDate');
      return accountStatus.parseDateString(dateString);
    }
    this.getLogonCount = function(){
      return accountStatus.getNumber(xml, '/eveapi/result/logonCount');
    }
    this.getLogonMinutes = function(){
      return accountStatus.getNumber(xml, '/eveapi/result/logonMinutes');
    }
    return this;
  };

  function getAccountStatus(callback){
    APIMethod.call(this,apiPath);
    this.getResponse(callback, Result);
  } 
 this.getAccountStatus = getAccountStatus;
 return this;
};
AccountStatus.prototype = APIMethod;

var accountStatus;

exports.init = function(keyID, vCode){
  accountStatus = new AccountStatus(keyID, vCode);
}
exports.getAccountStatus = function(callback){
  return accountStatus.getAccountStatus(callback);
}
