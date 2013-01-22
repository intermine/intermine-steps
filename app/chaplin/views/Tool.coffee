Chaplin = require 'chaplin'

Tool = require 'chaplin/models/Tool'

module.exports = class ToolView extends Chaplin.View

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    # Accordion template.
    getTemplateFunction: -> require 'chaplin/templates/tool'

    # Extend Model by the step.
    getTemplateData: ->
        o = _.extend @model.toJSON(), 'step': @step
        # Do we have extra params?
        if @options.params then o = _.extend o, 'params': @options.params
        # Done.
        o

    initialize: ->
        super

        # Set the step.
        @step = @options.step or 1

    afterRender: ->
        super

        name = @model.get('name')
        assert name, 'Name of the tool is not provided'

        # Render a specific step into our accordion template.
        $(@el).find("ul.accordion li(data-step='<%= @step %>') div.content").html (require("chaplin/templates/tools/#{name}/step-#{@step}"))(@getTemplateData())
        
        # Render next steps wrapper.
        (aside = $('aside#right')).html do require("chaplin/templates/sidebar-right")

        ul = aside.find('ul')
        # Any next steps for this tool & step?
        model = @model.toJSON()
        if model.output
            for k, v of model.output
                if v.step is @step
                    # Remove placeholder.
                    aside.find('p').remove()
                    # Append the link.
                    ul.append li = $ '<li/>'
                    li.append a = $ '<a/>', 'data-tool': k, 'text': v.text
                    # Register onclick event.
                    a.click => Chaplin.mediator.publish 'router:route', k, null, @serialize()

        @

    serialize: -> assert false, 'Override with custom logic for this tool'

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion li.active div.content')

    # Call to emit a message changing a tool step.
    # nextStep: -> Chaplin.mediator.publish 'app:newTool', @model, @step + 1

    # # Add this tool to a history.
    # addHistory: ->
    #     # TODO: First update our model by serializing any form we find in our step if we are not locked!.

    #     # Are we a locked tool?
    #     if @model.get('locked')
    #         # Duplicate
    #         model = @model.toJSON()
    #         # Remove the lock status.
    #         model.locked = false
    #         # Set the creation date to now.
    #         model.created = Date.now()
    #         # Change the description.
    #         model.description = 'Autogen baby!'

    #         # Create from Class.
    #         model = new Tool model

    #         # Now send a message to save the model.
    #         Chaplin.mediator.publish 'history:branch', model

    #     # We are continuing a chain.
    #     else
    #         model = @model
            
    #         # Now send a message to save the model.
    #         Chaplin.mediator.publish 'history:continue', model

    #     # Activate the tool.
    #     Chaplin.mediator.publish 'step:activate', model