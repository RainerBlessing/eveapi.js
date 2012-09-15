var nconf = require('nconf');
nconf.argv()
     .env()
     .file({ file: 'config.json' });

exports.account = {

  setUp: function(callback){
    var eveapi,
        keyID = nconf.get('keyID'),
        vCode = nconf.get('vCode');
    this.eveapi = eveapi=require('./eveapi').create(callback, keyID, vCode);

    this.characterID = nconf.get('characterID');
  },

  testAccountBalance: function(test){
 
    function callback(response){
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
 
      asset = assetList.getAsset("150212063");
      test.ok(asset!=null);
      test.done();
    }

    this.eveapi.character.getAssetList(callback, this.characterID);
  },

  testUpcomingCalendarEvents: function(test){

    function callback(response){
      var upcomingCalendarEvents;
      var upcomingCalendarEvent;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);

      upcomingCalendarEvents = response.getResult();

      upcomingCalendarEvent = upcomingCalendarEvents.getUpcomingEvent('93264');
      test.ok(upcomingCalendarEvent!==null);

      upcomingCalendarEvents.each(function(upcomingCalendarEventLoop){
        test.ok(upcomingCalendarEvent===upcomingCalendarEventLoop);
      });

      test.done();
    }

    this.eveapi.character.getUpcomingCalendarEvents(callback, this.characterID);

  }
} 
 
