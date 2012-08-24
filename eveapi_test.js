var nconf = require('nconf');
nconf.argv()
     .env()
     .file({ file: 'config.json' });

exports.testAccountStatus = function(test){

  var eveapi,
      keyID = nconf.get('keyID'),
      vCode = nconf.get('vCode');

  function callback(requestInfo){
    test.ok(requestInfo.getCurrentTime!=null);
    
    console.info(requestInfo.getCurrentTime());

    test.ok(requestInfo.getCurrentTime()!=null);
    test.ok(requestInfo.getCachedUntil()!=null);

    test.ok(accountStatus.getPaidUntil()!=null);
    test.ok(accountStatus.getCreateDate()!=null);
    test.ok(accountStatus.getLogonCount()!=null);
    test.ok(accountStatus.getLogonMinutes()!=null);

    test.done();
  }

  eveApi=require('./eveapi').create(callback, keyID, vCode);
  accountStatus = eveApi.getAccountStatus();
}
