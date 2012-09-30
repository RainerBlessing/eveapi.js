var APIMethod = require('../api_method').create();
var MarketOrders = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getMarketOrders(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/MarketOrders.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getMarketOrders = getMarketOrders;
  return this;
};
MarketOrders.prototype = APIMethod;

var market_orders;

exports.init = function(keyID, vCode, https){
  market_orders = new MarketOrders(keyID, vCode, https);
}
exports.getMarketOrders = function(callback, eventID, characterID){
  return market_orders.getMarketOrders(callback, eventID, characterID);
}
