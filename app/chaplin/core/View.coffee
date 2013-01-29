Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

module.exports = class View extends Chaplin.View

    afterRender: ->
        super
        # console.log '+' + @cid, @constructor.name

    # Stop listening to our music.
    dispose: ->
        # console.log '-' + @cid, @constructor.name
        Mediator.unsubscribe null, null, @
        super