Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView

    afterRender: ->
        super

        @delegate 'click', '#submit', ->
            # Get the DOM data.
            @model.set 'form', @getDOM().find('form textarea').val().split(' ')
            # Update the history.
            Mediator.publish 'history:add', @model
            # Change the step.
            Mediator.publish 'tool:step', @step += 1

        @

    # What does it mean for this tool to serialize?
    serialize: -> @model.get('form')