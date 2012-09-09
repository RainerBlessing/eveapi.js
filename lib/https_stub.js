var url = require('url');
var fs = require('fs');

var HTTPSStub = function(){
  var handlers={};
  var get = function(optionsget, callback){
    var p = url.parse(optionsget.path,true);
    console.log(p.pathname);
    console.log(p.query);
    var res = {
      on: function(handler, callback){
            handlers[handler] = callback;
          }
    };
    fs.readFile('templates'+p.pathname, function (err, data) {
      if (err) throw err;
      handlers['data'](data);
    });
    callback(res);
    return res;
  };
  this.get = get;
  return this;
};

exports.get = function(optionsget, callback){
  return new HTTPSStub().get(optionsget, callback); 
}
