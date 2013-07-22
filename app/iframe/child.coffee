Samskipti = require 'iframe/Samskipti'

module.exports = ->
    # New Apps/A Client.
    apps = new intermine.appsA document.location.href.replace('/iframe.html', '')

    # Build a channel with our parent.
    channel = new Samskipti
        'window': window.parent
        'origin': '*'
        'scope': 'steps'

    # Someone wants an app built?
    channel.listenOn.apps = (args) ->
        console.log args