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

  },

  testCalendarEventAttendees: function(test){

    function callback(response){
      var calendarEventAttendees;
      var calendarEventAttendee;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);

      calendarEventAttendees = response.getResult();

      calendarEventAttendee = calendarEventAttendees.getEventAttendee('192837645');
      test.ok(calendarEventAttendee!==null);

      test.done();
    }
    this.eveapi.character.getCalendarEventAttendees(callback, this.eventID, this.characterID);

  },
  testCharacterSheet: function(test){

    function callback(response){
      var result;
      var characterID;
      var attributeEnhancers;

      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);

      result = response.getResult();
      characterID = result.getCharacterID();
      test.ok(characterID=='150337897');
      charismaBonus = result.getAttributeEnhancers().getCharismaBonus();
      test.ok(charismaBonus.getAugmentatorValue()=='1');

      test.done();
    }
    this.eveapi.character.getCharacterSheet(callback, this.characterID);

  },
  testContactList: function(test){
 
    function callback(response){
      var contact;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      contact = result.getContactList("797400947");
      test.ok(contact.contactName==='CCP Garthagk');
      contact = result.getAllianceContactList("797400947");
      test.ok(contact.contactName==='CCP Garthagk');
      test.done();
    }

    this.eveapi.character.getContactList(callback, this.characterID);
  },
  testContactNotifications: function(test){
 
    function callback(response){
      var contactNotification;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      contactNotification = result.getContactNotification("308734131");
      test.ok(contactNotification.messageData =="level: 10\nmessage: Hi, I want to social network with you!\n");
      test.done();
    }

    this.eveapi.character.getContactNotifications(callback, this.characterID);
  },
  testContracts: function(test){
 
    function callback(response){
      var contract;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      contract = result.getContractList("12345");
      test.ok(contract.issuerID =="54321");
      test.done();
    }

    this.eveapi.character.getContracts(callback, this.characterID);
  },
  testContractItems: function(test){
 
    function callback(response){
      var itemList;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      itemList = result.getItemList("600515136");
      test.ok(itemList.quantity =="1");
      test.done();
    }

    this.eveapi.character.getContractItems(callback, this.characterID, '12345');
  },
/*
  testContractBids: function(test){
 
    function callback(response){
      var contract_bids;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getContractBids(callback, this.characterID);
  },
*/
  testFactionalWarfareStats: function(test){
 
    function callback(response){
      var factional_warfare_stats;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getFactionalWarfareStats(callback, this.characterID);
  },

  testIndustryJobs: function(test){
 
    function callback(response){
      var industry_jobs;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getIndustryJobs(callback, this.characterID);
  },
/*
  testKillLog: function(test){
 
    function callback(response){
      var kill_log;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getKillLog(callback, this.characterID);
  },
  testLocations: function(test){
 
    function callback(response){
      var locations;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getLocations(callback, this.characterID);
  },

  testMailBodies: function(test){
 
    function callback(response){
      var mail_bodies;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getMailBodies(callback, this.characterID);
  },
*/
  testMailingLists: function(test){
 
    function callback(response){
      var mailing_lists;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getMailingLists(callback, this.characterID);
  },

  testMailMessages: function(test){
 
    function callback(response){
      var mail_messages;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getMailMessages(callback, this.characterID);
  },

  testMarketOrders: function(test){
 
    function callback(response){
      var market_orders;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getMarketOrders(callback, this.characterID);
  },

  testMedals: function(test){
 
    function callback(response){
      var medals;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getMedals(callback, this.characterID);
  },

  testNotifications: function(test){
 
    function callback(response){
      var notifications;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getNotifications(callback, this.characterID);
  },
/*
  testNotificationTexts: function(test){
 
    function callback(response){
      var notification_texts;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getNotificationTexts(callback, this.characterID);
  },
*/
  testResearch: function(test){
 
    function callback(response){
      var research;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getResearch(callback, this.characterID);
  },

  testSkillInTraining: function(test){
 
    function callback(response){
      var skill_in_training;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getSkillInTraining(callback, this.characterID);
  },

  testSkillQueue: function(test){
 
    function callback(response){
      var skill_queue;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getSkillQueue(callback, this.characterID);
  },

  testStandings: function(test){
 
    function callback(response){
      var standings;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getStandings(callback, this.characterID);
  },

  testUpcomingCalendarEvents: function(test){
 
    function callback(response){
      var upcoming_calendar_events;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getUpcomingCalendarEvents(callback, this.characterID);
  },

  testWalletJournal: function(test){
 
    function callback(response){
      var wallet_journal;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getWalletJournal(callback, this.characterID);
  },

  testWalletTransactions: function(test){
 
    function callback(response){
      var wallet_transactions;
 
      test.ok(response.getCurrentTime() instanceof Date);
      test.ok(response.getCachedUntil() instanceof Date);
 
      result = response.getResult();
      test.done();
    }

    this.eveapi.character.getWalletTransactions(callback, this.characterID);
  }
} 
 
