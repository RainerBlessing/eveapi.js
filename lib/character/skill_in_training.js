var APIMethod = require('../api_method').create();
var SkillInTraining = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getSkillInTraining(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/SkillInTraining.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getSkillInTraining = getSkillInTraining;
  return this;
};
SkillInTraining.prototype = APIMethod;

var skill_in_training;

exports.init = function(keyID, vCode, https){
  skill_in_training = new SkillInTraining(keyID, vCode, https);
}
exports.getSkillInTraining = function(callback, eventID, characterID){
  return skill_in_training.getSkillInTraining(callback, eventID, characterID);
}
