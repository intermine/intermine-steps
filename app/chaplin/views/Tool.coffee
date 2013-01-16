Chaplin = require 'chaplin'

module.exports = class ToolView extends Chaplin.View

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    # Need to be replaced with a name of the actual tool name.
    name: 'Dummy'

    initialize: ->
        super

        # Set the step.
        @step = @options.step or 1

    afterRender: ->
        super

        # Do we have next steps to show by any chance? Otherwise go default.
        try
            tml = require "chaplin/templates/tools/#{@name}/step-#{@step}-next"
        catch err
            tml = require "chaplin/templates/sidebar-right"

        $('aside#right').html tml()

        @

    # Render a specific template on each step.
    getTemplateFunction: -> require "chaplin/templates/tools/#{@name}/step-#{@step}"

    # Call to emit a message changing a tool step.
    nextStep: -> Chaplin.mediator.publish 'app:changeTool', @name, @step + 1

    # Add this tool to a history.
    addHistory: -> Chaplin.mediator.publish 'history:add', @model