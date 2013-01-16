ToolView = require 'chaplin/views/Tool'

module.exports = class CompareListsToolView extends ToolView

    name: 'CompareListsTool'

    initialize: ->
        super

        # Set on Model.
        @model.set 'description', 'Compares lists.'
        @model.set 'type', 'orange'

    afterRender: ->
        super

        @delegate 'click', '#submit', @submit

        @

    # Submit list comparison, ask for next step.
    submit: ->
        @addHistory()
        @nextStep()