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
      var accountBalance;
      var account;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      accountBalance = response.getResult();
 
      account = accountBalance.getAccount(4807144);
      test.ok(account.accountKey === "1000");
      test.ok(account.balance === "209127823.31");

      accountBalance.each(function(accountLoop){
        test.ok(account === accountLoop);
      }); 
      test.done();
    }

    this.eveapi.character.getAccountBalance(callback, this.characterID);
  },

  testAssetList: function(test){
 
    function callback(response){
      var result;
      var rowset;
      var assetList;
      var asset;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      assetList = response.getResult();
      asset = assetList.getAsset("150354641");
      test.ok(asset!=null);
      assetList.each(function(assetLoop){
        test.ok(assetLoop!=null);
      });
      content = asset.getContent("150354709");
      test.ok(content!=null);
 
      test.done();
    }

    this.eveapi.character.getAssetList(callback, this.characterID);
  }
} 
 
