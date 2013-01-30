Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

Tool = require 'chaplin/models/Tool'

module.exports = class History extends Chaplin.Collection

    'model': Tool

    'url': '/api/history'

    initialize: ->
        super

        # Provide a link to the 'current' state.
        @current =
            'row': 0
            'col': -1

        Mediator.subscribe 'history:add', @addTool, @

    # Get the Model @ current state.
    getCurrent: ->
        assert @current, "Do not have a `current` object in History collection"
        (@where(@current)).pop()

    # Add a tool to our collection.
    addTool: (model) =>
        # Set the creation time.
        model.set 'created', new Date()
        # Add to the collection.
        @add model
        # Say the View needs to update.
        Mediator.publish 'history:update', model