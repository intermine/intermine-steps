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
        $(@el).find("ul.accordion li(data-step='<%= @step %>') div.content").html (require("tools/templates/#{name}/step-#{@step}"))(@getTemplateData())
        
        # Render next steps wrapper.
        (aside = $('aside#right')).html do require("chaplin/templates/sidebar-right")

        ul = aside.find('ul')
        # Any next steps for this tool & step?
        model = @model.toJSON()
        if model.next
            for k, v of model.next
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