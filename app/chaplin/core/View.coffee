Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

module.exports = class View extends Chaplin.View

    afterRender: ->
        super
        console.log "%c+#{@cid} #{@constructor.name}", 'color: #FFF; background: #5da423'

    # Stop listening to our music.
    dispose: ->
        console.log "%c-#{@cid} #{@constructor.name}", 'color: #FFF; background: #c60f13'
        Mediator.unsubscribe null, null, @
        super