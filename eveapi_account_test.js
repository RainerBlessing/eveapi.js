var nconf = require('nconf');
  nconf.argv()
.env()
  .file({ file: 'config.json' });

  exports.account = {

    setUp: function(callback){
             var eveapi,
             keyID = nconf.get('keyID'),
             vCode = nconf.get('vCode');
             this.eveapi = eveapi=require('./eveapi').create(callback,keyID, vCode);
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
                        var character;

                        test.ok(response.getCurrentTime() instanceof Date);
                        test.ok(response.getCachedUntil() instanceof Date);

                        apiKeyInfo = response.getResult();
                        test.ok(apiKeyInfo.getAPIKeyInfo().accessMask !== null);
                        test.ok(apiKeyInfo.getAPIKeyInfo().type !== null);
                        test.ok(apiKeyInfo.getAPIKeyInfo().expires !== null);
console.log(apiKeyInfo.getKey());
                        character = apiKeyInfo.getKey().getCharacter(898901870); 
                        test.ok(character.characterID!=null);
                        test.ok(character.characterName!=null);
                        test.ok(character.corporationID!=null);
                        test.ok(character.corporationName!=null);

                        apiKeyInfo.getKey().each(function(characterLoop){
                          test.ok(characterLoop === character); 
                        });

                        test.done();
                      }

                      this.eveapi.account.getAPIKeyInfo(callback);
                    },

    testCharacters: function(test){

                      function callback(response){
                        var apiKeyInfo;
                        var character;

                        test.ok(response.getCurrentTime() instanceof Date);
                        test.ok(response.getCachedUntil() instanceof Date);

                        apiKeyInfo = response.getResult();
                        character = apiKeyInfo.getCharacter(1365215823); 
                        test.ok(character.characterID!=null);
                        test.ok(character.name!=null);
                        test.ok(character.corporationID!=null);
                        test.ok(character.corporationName!=null);

                        apiKeyInfo.each(function(characterLoop){
                          test.ok(characterLoop === character); 
                        });

                        test.done();
                      }

                      this.eveapi.account.getCharacters(callback);
                    }
  } 

