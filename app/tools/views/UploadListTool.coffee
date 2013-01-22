Chaplin = require 'chaplin'

ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView

    afterRender: ->
        super

        @delegate 'click', '#submit', ->
            # Serialize form.
            @model.set 'form', @getDOM().find('form textarea').val().split(' ')
            # Change route passing our serialized model.
            Chaplin.mediator.publish 'router:route', @model.toJSON(), 2

        @

    # What does it mean for this tool to serialize?
    serialize: -> @model.get('form')