var nconf = require('nconf');
nconf.argv()
     .env()
     .file({ file: 'config.json' });

exports.testAccountStatus = function(test){

  var eveapi,
      keyID = nconf.get('keyID'),
      vCode = nconf.get('vCode');

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

  eveapi=require('./eveapi').create(keyID, vCode);
  eveapi.getAccountStatus(callback);
}

exports.testAPIKeyInfo = function(test){
  var eveapi,
      keyID = nconf.get('keyID'),
      vCode = nconf.get('vCode');

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

  eveapi=require('./eveapi').create(keyID, vCode);
  eveapi.getAPIKeyInfo(callback);
}
