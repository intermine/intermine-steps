Chaplin = require 'chaplin'

module.exports = class UploadListToolView extends Chaplin.View

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    initialize: ->
        super

        # Set the step.
        @step = @options.step or 1

        # Set on Model.
        @model.set 'description', 'Produces a list.'
        @model.set 'type', 'green'

    # Render a specific template on each step.
    getTemplateFunction: ->
        switch @step
            when 1 then require 'chaplin/templates/tools/upload-input'
            when 2 then require 'chaplin/templates/tools/upload-done'

    afterRender: ->
        super

        # Handle submit clicks.
        @delegate 'click', '#submit', @submit

        @

    # Submit list upload.
    submit: ->
        # Create a step in a history by emitting a message.
        Chaplin.mediator.publish 'history:add', @model
        Chaplin.mediator.publish 'app:changeTool', 'UploadList', 2