Mediator = require './Mediator'

root = @

module.exports = class View extends Chaplin.View

    # Save args.
    initialize: (@options) ->
        super

        # Garbage collect these.
        @views = []
        @timeouts = []

        @

    attach: ->
        super
        # console.green "+#{@cid} #{@constructor.name}"

        # Add our cid.
        $(@el).attr 'data-cid', @cid

    dispose: ->
        # console.red "-#{@cid} #{@constructor.name}"

        # Cleanup Views.
        ( v?.dispose() for v in @views )

        # Remove timeouts.
        ( clearTimeout(t) for t in @timeouts )

        # Stop listening to our music.
        Mediator.unsubscribe null, null, @
        
        super

    # Set a property on us.
    property: (data) -> root.Utils.cloneDeep data