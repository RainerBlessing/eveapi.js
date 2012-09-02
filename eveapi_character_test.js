var nconf = require('nconf');
nconf.argv()
     .env()
     .file({ file: 'config.json' });

exports.account = {

  setUp: function(callback){
    var eveapi,
        keyID = nconf.get('keyID'),
        vCode = nconf.get('vCode');
    this.eveapi = eveapi=require('./eveapi').create(keyID, vCode);

    this.characterID = nconf.get('characterID');
    callback();
  },

  testAccountBalance: function(test){
 
    function callback(response){
      var result;
      var rowset;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
 
      rowset = result.getRowset();
      test.ok(rowset['accounts'][0].accountID!=null);
      test.ok(rowset['accounts'][0].accountKey!=null);
      test.ok(rowset['accounts'][0].balance!=null);
 
      test.done();
    }

    this.eveapi.character.getAccountBalance(callback, this.characterID);
  }
} 
 
