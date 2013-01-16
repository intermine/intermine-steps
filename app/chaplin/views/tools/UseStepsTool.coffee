ToolView = require 'chaplin/views/Tool'

module.exports = class UseStepsToolView extends ToolView
    
    name: 'UseStepsTool'

    steps: [
        'Choose Steps from History'
        'See Steps'
    ]

    initialize: ->
        super

        # Set on Model.
        @model.set 'description', 'Saved Steps.'
        @model.set 'type', 'dark'

    afterRender: ->
        super
        
        @delegate 'click', 'ol.list a', @select

        @

    # Select Steps, ask for next step.
    select: ->
        @addHistory()
        @nextStep()