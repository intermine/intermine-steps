Chaplin = require 'chaplin'

module.exports = class Controller extends Chaplin.Controller

    # Cleanup these.
    views: []

    initialize: ->
        # console.blue @constructor.name
        super

    # Remove all attached Views.
    dispose: ->
        ( view.dispose() for view in @views )
        super