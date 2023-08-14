const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

require('./routes/1/routes.js')(router);
require('./routes/2/routes.js')(router);
require('./routes/3/routes.js')(router);
require('./routes/4/routes.js')(router);
require('./routes/5/routes.js')(router);
require('./routes/6/routes.js')(router);
require('./routes/7/routes.js')(router);
require('./routes/8/routes.js')(router);
require('./routes/9/routes.js')(router);
require('./routes/10/routes.js')(router);
require('./routes/11/routes.js')(router);
require('./routes/12/routes.js')(router);
require('./routes/13/routes.js')(router);
require('./routes/14/routes.js')(router);
require('./routes/15/routes.js')(router);
require('./routes/16/routes.js')(router);
require('./routes/17/routes.js')(router);
require('./routes/18/routes.js')(router);
require('./routes/19/routes.js')(router);

module.exports = router
