Samskipti = require 'iframe/Samskipti'

module.exports = ->
    # New Apps/A Client.
    apps = new intermine.appsA document.location.href.replace('/iframe.html', '')

    # Build a channel with our parent.
    channel = new Samskipti 'B',
        'window': window.parent
        'origin': '*'
        'scope': 'steps'

    # Someone wants an app built?
    channel.listenOn.apps = (name, config) ->
        # Load it into my body.
        apps.load name, 'body', config

    channel.listenOn.tables = (config) ->
        # Load the table into the body.
        config.type ?= "table"
        jQuery('body').imWidget(config)
