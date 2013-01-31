Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

Tool = require 'chaplin/models/Tool'

module.exports = class History extends Chaplin.Collection

    'model': Tool

    'url': '/api/history'

    initialize: ->
        super

        # Provide a link to the 'current' state.
        @current = null

        Mediator.subscribe 'history:add', @addTool, @

    # Get the Model @ current state.
    getCurrent: ->
        assert @current, "Do not have a `current` object in a History collection"
        (@where(@current)).pop()

    # Get the first available row.
    getHeight: ->
        rows = 0
        @each (model) ->
            row = model.get('row')
            rows = row if row > rows
        rows

    # Add a tool to our collection.
    addTool: (model) =>
        # Set the creation time.
        model.set 'created', new Date()

        # Do we have a current step?
        unless @current
            # Do we have models already?
            if @length isnt 0
                # Get the first available row.
                @current = 'row': @getHeight() + 1, 'col': 0
            else
                # First row, first column.
                @current = 'row': 0, 'col': 0
        else
            # Are we continuing or are we doing an alternate step to this one?

            # Set the parent.
            model.set 'parent': @getCurrent().toJSON()
            # Continue in the same vein.
            @current.col += 1

        # Set us on current.
        model.set @current
        # Add to the collection.
        @add model
        # Say the View needs to update.
        Mediator.publish 'history:update', model
        # Activate this model.
        Mediator.publish 'history:activate', @current
        # Now do the sync.
        Backbone.sync 'update', @