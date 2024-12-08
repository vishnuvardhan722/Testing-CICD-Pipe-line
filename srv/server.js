const cds = require('@sap/cds');
const proxy = require('@sap/cds-odata-v2-adapter-proxy');

// Bootstrap the application
cds.on('bootstrap', (app) => {
    app.use(proxy());
});

// Start the server
module.exports = cds.server;
