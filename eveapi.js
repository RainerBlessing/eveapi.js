var readdirp = require('readdirp');
var camelize = function ( s) {
    return s.replace (/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? c.toUpperCase () : '';
    })
};

var EveApi = function(callback, keyID, vCode){
  var https = require('./lib/https_stub');
  var that = this;

  readdirp({ root: './lib', fileFilter: '*.js' }, function (err, res) {
    var files = res['files'];
    var file;
    var className;
    var fileName;
    var parentDir;
    var apiObject;
    var propertyName;

    for (index in files){
      file = files[index];
      fileName=file.name 
      className = camelize(fileName.substring(0,fileName.length-3))
      parentDir = file.parentDir;
      apiObject = require(file.fullPath);
      if(file.parentDir.length>0){
        for(propertyName in apiObject) {
          if(propertyName.match(/^get/)){
            if(that[parentDir] == undefined){
              that[parentDir] = {};
            }
            that[parentDir][propertyName] = apiObject[propertyName];
          }
        }
        apiObject['init'](keyID, vCode, https);
  
      }
    }
    callback();
  });
  return this;
};

exports.create = function create(callback, keyID, vCode){
 var eveApi= new EveApi(callback, keyID, vCode);
 return eveApi;
}
