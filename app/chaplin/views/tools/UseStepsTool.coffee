Chaplin = require 'chaplin'

module.exports = class UseStepsToolView extends Chaplin.View

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    # Begin at this internal step.
    step: 1

    initialize: ->
        super

        # Set on Model.
        @model.set 'description', 'Saved Steps.'
        @model.set 'type', 'dark'

    # Render a specific template on each step.
    getTemplateFunction: ->
        switch @step
            when 1 then require 'chaplin/templates/tools/steps-select'
            when 2 then require 'chaplin/templates/tools/steps-view'

    afterRender: ->
        super

        switch @step
            when 1
                # Handle clicks.
                @delegate 'click', 'ol.list a', @select
            when 2

        @

    # Select Steps, ask for next step.
    select: ->
        # Create a step in a history by emitting a message.
        Chaplin.mediator.publish 'history', 'add', @model

        # Change the step and re-render.
        @step += 1
        @render()