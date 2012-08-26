var AccountStatus = function(keyID, vCode){

  var apiPath = '/account/AccountStatus.xml.aspx?keyID='+keyID+'&vCode='+vCode;

  var Result = function(APIMethod,xml){
    this.getPaidUntil = function(){
      var dateString = APIMethod.getDateString(xml, '/eveapi/result/paidUntil');
      return APIMethod.parseDateString(dateString);
    }
    this.getCreateDate = function(){
      var dateString = APIMethod.getDateString(xml, '/eveapi/result/createDate');
      return APIMethod.parseDateString(dateString);
    }
    this.getLogonCount = function(){
      return APIMethod.getNumber(xml, '/eveapi/result/logonCount');
    }
    this.getLogonMinutes = function(){
      return APIMethod.getNumber(xml, '/eveapi/result/logonMinutes');
    }
    return this;
  };

  function getAccountStatus(callback){
    this.getResponse(apiPath, callback, Result);
  } 
 this.getAccountStatus = getAccountStatus;
 return this;
};

AccountStatus.prototype = require('../api_method').create();

var accountStatus;

exports.init = function(keyID, vCode){
  accountStatus = new AccountStatus(keyID, vCode);
}
exports.getAccountStatus = function(callback){
  return accountStatus.getAccountStatus(callback);
}
