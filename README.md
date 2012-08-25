#Eve Online API (https://support.eveonline.com/api) for node.js

##Required Node Modules:
- libxmljs
- nconf
- nodeunit for tests
- dateformatjs

##Installation

Run "npm install" to install the required modules.
Rename config.json.sample to config.json and enter your <keyID> and <vCode>.

##Usage
```js
var eveapi = require('./eveapi').create(keyID, vCode);
```

