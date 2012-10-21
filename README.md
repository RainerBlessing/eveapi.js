#Eve Online API (http://wiki.eveonline.com/en/wiki/EVE_API_Functions) for node.js

##Required Node Modules:
- libxmljs
- nconf
- nodeunit for tests
- dateformatjs

##Installation

Run "npm install" to install the required modules.
Rename config.json.sample to config.json and enter your *keyID* and *vCode* if
you want to run the tests.

##Usage
```js
var eveapi = require('eveapi').create(keyID, vCode);
```
[api_functions.md](/RainerBlessing/eveapi.js/blob/master/api_functions.md) contains a list of implemented api functions.
