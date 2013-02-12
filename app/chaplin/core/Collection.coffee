Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

module.exports = class Collection extends Chaplin.Collection

    initialize: ->
        super

        # Garbage collect these.
        @timeouts = []

        @

    dispose: ->
        # Remove timeouts.
        ( clearTimeout(t) for t in @timeouts )

        # Stop listening to our music.
        Mediator.unsubscribe null, null, @
        
        super