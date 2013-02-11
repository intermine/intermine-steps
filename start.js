#!/usr/bin/env node
if (process.env.NODE_ENV == 'dev') {
    p = require('procstreams');
    p('./node_modules/.bin/brunch watch --server').out();
} else {
    require('coffee-script');
    server = require('./server.coffee');
    server.startServer(process.env.PORT);
}