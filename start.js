#!/usr/bin/env node
if (process.env.NODE_ENV == 'dev') {
    // Watch in development mode.
    var watch = require('./node_modules/brunch/lib/commands/watch.js');
    watch(true, { '0': 'watch', 'server': true, 'port': process.env.PORT || 0 });
} else {
    // Server the /public through our server.
    require('coffee-script');
    (require('./server.coffee')).startServer(process.env.PORT);
}