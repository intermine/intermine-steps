Chaplin = require 'chaplin'

module.exports = class CompareListsToolView extends Chaplin.View

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    initialize: ->
        super

        # Set the step.
        @step = @options.step or 1

        # Set on Model.
        @model.set 'description', 'Compares <em>n</em> lists.'
        @model.set 'type', 'orange'

    getTemplateFunction: ->
        switch @step
            when 1 then require 'chaplin/templates/tools/compare-input'
            when 2 then require 'chaplin/templates/tools/compare-done'

    afterRender: ->
        super

        @delegate 'click', '#submit', @submit

        @

    # Submit list upload, ask for next step.
    submit: ->
        # Create a step in a history by emitting a message.
        Chaplin.mediator.publish 'history:add', @model

        # Change the step and re-render.
        @step += 1
        @render()