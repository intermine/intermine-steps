ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView

    name: 'UploadListTool'

    afterRender: ->
        super

        @delegate 'click', '#submit', @submit

        @

    # Submit list upload, ask for next step.
    submit: ->
        @addHistory()
        @nextStep()