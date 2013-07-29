Samskipti = require 'iframe/Samskipti'

module.exports = ->
    # Store libs here.
    libs = {}

    # Build a channel with our parent.
    channel = new Samskipti 'B',
        'window': window.parent
        'origin': '*'
        'scope': 'steps'

    # Someone wants an app built?
    channel.listenOn.apps = (name, config) ->
        # New Apps/A Client?
        libs.apps ?= new intermine.appsA document.location.href.replace('/iframe.html', '')
        
        # Load it into my body.
        libs.apps.load name, 'body', config

    channel.listenOn.tables = (config) ->
        # Load the table into the body.
        config.type ?= "table"
        jQuery('body').imWidget(config)
