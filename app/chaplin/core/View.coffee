Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

module.exports = class View extends Chaplin.View

    afterRender: ->
        super
        console.green "+#{@cid} #{@constructor.name}"

    # Stop listening to our music.
    dispose: ->
        console.red "-#{@cid} #{@constructor.name}"
        Mediator.unsubscribe null, null, @
        super