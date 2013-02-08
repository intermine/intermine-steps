Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView
    
    afterRender: ->
        super

        switch @step
            when 2
                # We have a list!
                Mediator.publish 'context:i:haveList'

        @delegate 'click', '#submit', ->
            # Get the DOM data.
            @model.set 'data', { 'identifiers': @getDOM().find('form textarea').val().split(' ') }
            # Update the history.
            Mediator.publish 'history:add', @model
            # Change the step.
            Mediator.publish 'tool:step', @step += 1

        @