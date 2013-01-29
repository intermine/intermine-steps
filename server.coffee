#!/usr/bin/env coffee
flatiron = require 'flatiron'
union    = require 'union'
connect  = require 'connect'
send     = require 'send'

# Store all histories here.
history = []

# Export for Brunch.
exports.startServer = (port, dir) ->
    app = flatiron.app
    app.use flatiron.plugins.http,
        'before': [
            # Have a nice favicon.
            connect.favicon()
            # Static file serving.
            connect.static "./#{dir}"
        ]
        'onError': (err, req, res) ->
            if err.status is 404
                # Silently serve the root of the client app.
                send(req, 'index.html')
                    .root('./public')
                    .on('error', union.errorHandler)
                    .pipe(res)
            else
                # Go Union!
                union.errorHandler err, req, res

    app.router.path '/api/history', ->
        # Add a history tool to the db.
        @get ->
            @res.writeHead 200, 'content-type': 'application/json'
            @res.write JSON.stringify history
            @res.end()

        # Retrieve all history tools from the db.
        @put ->
            history = @req.body

            @res.writeHead 200, 'content-type': 'application/json'
            @res.end()

    app.start port, (err) ->
        throw err if err