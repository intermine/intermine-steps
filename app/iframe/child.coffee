Samskipti = require 'iframe/Samskipti'

# Bundles for API Loader that already exists on the page.
bundles =
    'apps-a':
        'js':
            'intermine.apps-a':
                path: '/iframe/js/intermine/intermine.apps-a-1.2.0.js'
    'imtables':
        'css':
            'whateva1':
                path: '/iframe/css/bootstrap-2.0.4.prefixed.css'
            'whateva2':
                path: '/iframe/css/intermine/imtables-1.3.0.css'
        'js':
            '_':
                path: '/iframe/js/lodash.underscore-1.2.1.js'
            'jQuery':
                path: '/iframe/js/jquery-1.9.1.js'
            'jQuery.imWidget':
                path: '/iframe/js/intermine/imtables-mini-bundle-1.3.0.js'
                depends: [ 'intermine.imjs' ]
            'intermine.imjs':
                path: '/iframe/js/intermine/im-2.5.1.js'
                depends: [ 'jQuery', '_' ]
            'Backbone':
                path: '/iframe/js/backbone-1.0.0.js'
                depends: [ 'jQuery', '_' ]

# Get a bundle and call back.
get = (bundle, cb) -> intermine.load bundles[bundle], cb

# Start being useful...
module.exports = ->
    # Build a channel with our parent.
    channel = new Samskipti 'B',
        'window': window.parent
        'origin': '*'
        'scope': 'steps'

    # Someone wants an app built?
    channel.listenOn.apps = (name, config) ->
        load = ->
            # New instance.
            apps = new intermine.appsA document.location.href.replace('/iframe.html', '')
            # Load it.
            apps.load name, 'body', config

        # Do we need to load bundle?
        return load.call null if intermine.appsA

        # Need to load the deps first.
        get 'apps-a', (err) ->
            throw err if err
            load.call null

    # Results tables.
    channel.listenOn.imtables = (config) ->
        # Load the table into the body.
        load = ->
            # IMJS.
            config.service = new intermine.Service
                'root': config.mine
                'token': config.token
                'errorHandler': (err) ->
                    throw err

            config.type ?= 'table'
            $('body').imWidget(config)

        # Do we need to load bundle?
        return load.call null if $?.imWidget

        # Need to load the deps first.
        get 'imtables', (err) ->
            throw err if err
            # Now load them.
            load.call null