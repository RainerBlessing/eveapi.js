var APIMethod = require('../api_method').create();
var SkillQueue = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getSkillQueue(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/SkillQueue.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getSkillQueue = getSkillQueue;
  return this;
};
SkillQueue.prototype = APIMethod;

var skill_queue;

exports.init = function(keyID, vCode, https){
  skill_queue = new SkillQueue(keyID, vCode, https);
}
exports.getSkillQueue = function(callback, eventID, characterID){
  return skill_queue.getSkillQueue(callback, eventID, characterID);
}
