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

    test.ok(response.getCurrentTime() instanceof Date);
    test.ok(response.getCachedUntil() instanceof Date);

    apiKeyInfo = response.getResult();

    test.ok(apiKeyInfo.getAPIKeyInfo() !== null);

    test.done();
  }

  eveapi=require('./eveapi').create(keyID, vCode);
  eveapi.getAPIKeyInfo(callback);
}
