Chaplin = require 'chaplin'

module.exports = class Controller extends Chaplin.Controller

    # Cleanup these.
    views: []

    initialize: ->
        console.log "%c#{@constructor.name}", 'color: #FFF; background: #2ba6cb'
        super

    # Remove all attached Views.
    dispose: ->
        ( view.dispose() for view in @views )
        super