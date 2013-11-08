#!/usr/bin/env coffee
flatiron = require 'flatiron'
union    = require 'union'
connect  = require 'connect'
send     = require 'send'
path     = require 'path'

# Middlewares.
appsA = require 'apps-a-middleware'

dir = __dirname
pub = path.resolve dir, '../client/public'

app = flatiron.app
app.use flatiron.plugins.http,
    'before': [
        # Have a nice favicon.
        connect.favicon()
        # Static file serving.
        connect.static pub
        # Apps/A Middleware.
        appsA
            'apps': [
                'git://github.com/intermine/intermine-apps-a.git'
            ]
    ]
    'onError': (err, req, res) ->
        if err.status is 404
            # Silently serve the root of the client app.
            send(req, 'index.html')
                .root(pub)
                .on('error', union.errorHandler)
                .pipe(res)
        else
            # Go Union!
            union.errorHandler err, req, res

app.start process.env.PORT, (err) ->
    throw err if err