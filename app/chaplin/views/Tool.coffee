Chaplin = require 'chaplin'

GenericToolView = require 'chaplin/views/GenericTool'

Tool = require 'chaplin/models/Tool'

module.exports = class ToolView extends GenericToolView

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
        # Are we locked?
        'locked': @model.get('locked')

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

        # Init "time ago" updater.
        @updateTime()

        @

    # Call to emit a message changing a tool step.
    nextStep: -> Chaplin.mediator.publish 'app:newTool', @model, @step + 1

    # Add this tool to a history.
    addHistory: ->
        # TODO: First update our model by serializing any form we find in our step if we are not locked!.

        # Start with 'us' by default.
        model = @model

        # Are we a locked tool?
        if @model.get('locked')
            # Duplicate
            model = @model.toJSON()
            # Remove the lock status.
            model.locked = false
            # Remove the creation date so it can be autogen.
            delete model.created
            # Change the description.
            model.description = 'Autogen baby!'
            # Create from Class.
            model = new Tool model

        # Now send a message to save the model.
        Chaplin.mediator.publish 'history:add', model