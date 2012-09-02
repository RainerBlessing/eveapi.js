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
    callback();
  },

  testAccountStatus: function(test){
 
      function callback(response){
      var accountStatus;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      accountStatus = response.getResult();
 
      test.ok(accountStatus.getPaidUntil() instanceof Date);
      test.ok(accountStatus.getCreateDate() instanceof Date);
      test.ok(accountStatus.getLogonCount() instanceof Number);
      test.ok(accountStatus.getLogonMinutes() instanceof Number);
 
      //TODO Gametime Offers
 
      test.done();
    }
 
    this.eveapi.account.getAccountStatus(callback);
  },

  testAPIKeyInfo: function(test){

   function callback(response){
     var apiKeyInfo;
     var rowset;

     test.ok(response.getCurrentTime() instanceof Date);
     test.ok(response.getCachedUntil() instanceof Date);

     apiKeyInfo = response.getResult();
     test.ok(apiKeyInfo.getAPIKeyInfo().accessMask !== null);
     test.ok(apiKeyInfo.getAPIKeyInfo().type !== null);
     test.ok(apiKeyInfo.getAPIKeyInfo().expires !== null);

     rowset = apiKeyInfo.getRowset();
     test.ok(rowset['characters'][0].characterID!=null);
     test.ok(rowset['characters'][0].characterName!=null);
     test.ok(rowset['characters'][0].corporationID!=null);
     test.ok(rowset['characters'][0].corporationName!=null);
     test.done();
   }

   this.eveapi.account.getAPIKeyInfo(callback);
  },

  testCharacters: function(test){

    function callback(response){
      var apiKeyInfo;
      var rowset;

      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);

      result = response.getResult();

      rowset = result.getRowset();
      test.ok(rowset['characters'][0].characterID!=null);
      test.ok(rowset['characters'][0].name!=null);
      test.ok(rowset['characters'][0].corporationID!=null);
      test.ok(rowset['characters'][0].corporationName!=null);
      test.done();
    }

    this.eveapi.account.getCharacters(callback);
  }
} 
 
