Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class EnrichListToolView extends ToolView

    afterRender: ->
        super

        switch @step
            when 1
                # Do we have a list set already?
                if @options.previous and @options.previous.data and @options.previous.data.identifiers
                    # Go straight to step 2 with this list preset.
                    @setList @options.previous.data.identifiers
            when 2
                # We better have the list set.
                assert @model.get('data'), 'List not provided'

        # Use a "list" from step #1.
        @delegate 'click', '#submit', -> @setList [ 'Random #1', 'Random #2' ]

        @

    # Set list and render step 2 saving into history.
    setList: (list) ->
        # Set on model.
        @model.set 'data': { 'list': list }
        # Update the history.
        Mediator.publish 'history:add', @model
        # Change the step.
        Mediator.publish 'tool:step', @step += 1