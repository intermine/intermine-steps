Chaplin = require 'chaplin'

Mediator = require 'chaplin/lib/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView

    afterRender: ->
        super

        @delegate 'click', '#submit', ->
            # Serialize form.
            @model.set 'form', @getDOM().find('form textarea').val().split(' ')
            # Update the history.
            Mediator.publish 'history:add', @model
            # Change route passing our serialized model.
            Mediator.publish 'router:route', @model.toJSON(), 2

        @

    # What does it mean for this tool to serialize?
    serialize: -> @model.get('form')