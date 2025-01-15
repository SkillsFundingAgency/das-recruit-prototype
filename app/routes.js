//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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
require('./routes/20/routes.js')(router);
require('./routes/21/routes.js')(router);
require('./routes/22/routes.js')(router);
require('./routes/23/routes.js')(router);
require('./routes/24/routes.js')(router);
require('./routes/25/routes.js')(router);
require('./routes/26/routes.js')(router);
require('./routes/27/routes.js')(router);
require('./routes/28/routes.js')(router);
require('./routes/29/routes.js')(router);
require('./routes/30/routes.js')(router);
require('./routes/31/routes.js')(router);
require('./routes/32/routes.js')(router);



