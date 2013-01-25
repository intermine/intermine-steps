Chaplin = require 'chaplin'

Mediator = require 'chaplin/lib/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class EnrichListToolView extends ToolView

    afterRender: ->
        super

        # Is this the first step?
        if @step is 1
            # Do we have a list set already?
            if @options.params and @options.params.list
                # Go straight to step 2 with this list preset.
                @setList @options.params.list

        @delegate 'click', '#submit', ->
            @setList 'Some random list, as if coming from Step #1'

        @

    # Set list and render step 2 saving into history.
    setList: (list) ->
        assert typeof(list) is 'string', "You need to pass in a list: #{JSON.stringify list}"

        # Set on model.
        @model.set 'list', list
        # Update the history.
        Mediator.publish 'history:add', @model
        # Change route passing our serialized model.
        Mediator.publish 'router:route', @model.toJSON(), 2