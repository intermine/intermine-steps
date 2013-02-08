Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

module.exports = class View extends Chaplin.View

    initialize: ->
        super

        # Garbage collect these.
        @views = []

        @

    afterRender: ->
        super
        # console.green "+#{@cid} #{@constructor.name}"

        # Add our cid.
        $(@el).attr 'data-cid', @cid

    dispose: ->
        # console.red "-#{@cid} #{@constructor.name}"

        # Cleanup Views.
        ( v?.dispose() for v in @views )

        # Stop listening to our music.
        Mediator.unsubscribe null, null, @
        super