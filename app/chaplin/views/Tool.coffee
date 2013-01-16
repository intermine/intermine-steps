Chaplin = require 'chaplin'

module.exports = class ToolView extends Chaplin.View

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    # Need to be replaced with a name of the actual tool name.
    name: 'Dummy'

    # Step names.
    steps: []

    # Accordion template.
    getTemplateFunction: -> require "chaplin/templates/tool"

    getTemplateData: ->
        # Split our name into a 'nice' form.
        'name': @name.replace /([A-Z])/g, ' $1'
        # Names so we can populate the tabs.
        'steps': @steps
        # Current step.
        'step': @step

    initialize: ->
        super

        # Set the step.
        @step = @options.step or 1

    afterRender: ->
        super

        # Render a specific step into our accordion template.
        $(@el).find("ul.accordion li(data-step='<%= @step %>') div.content").html require "chaplin/templates/tools/#{@name}/step-#{@step}"

        # Do we have next steps to show by any chance? Otherwise go default.
        try
            tml = require "chaplin/templates/tools/#{@name}/step-#{@step}-next"
        catch err
            tml = require "chaplin/templates/sidebar-right"
        
        $('aside#right').html tml()

        @

    # Call to emit a message changing a tool step.
    nextStep: -> Chaplin.mediator.publish 'app:changeTool', @name, @step + 1

    # Add this tool to a history.
    addHistory: -> Chaplin.mediator.publish 'history:add', @model