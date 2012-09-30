var APIMethod = require('../api_method').create();
var IndustryJobs = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getIndustryJobs(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/IndustryJobs.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getIndustryJobs = getIndustryJobs;
  return this;
};
IndustryJobs.prototype = APIMethod;

var industry_jobs;

exports.init = function(keyID, vCode, https){
  industry_jobs = new IndustryJobs(keyID, vCode, https);
}
exports.getIndustryJobs = function(callback, eventID, characterID){
  return industry_jobs.getIndustryJobs(callback, eventID, characterID);
}
