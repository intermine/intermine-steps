ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView

    name: 'UploadListTool'

    initialize: ->
        super

        # Set on Model.
        @model.set 'description', 'Produces a list.'
        @model.set 'type', 'green'

    afterRender: ->
        super

        @delegate 'click', '#submit', @submit

        @

    # Submit list upload, ask for next step.
    submit: ->
        @addHistory()
        @nextStep()