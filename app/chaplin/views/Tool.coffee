Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

Tool = require 'chaplin/models/Tool'

GenericToolView = require 'chaplin/views/GenericTool'

module.exports = class ToolView extends GenericToolView

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

        # Listen to Mediator requesting different pages.
        Mediator.subscribe 'tool:step', (@step) =>
            @render()
        , @

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
                    li.append a = $ '<a/>', 'href': '#', 'text': v.text

        # Do we have breadcrumbs to show?
        if window.History.length > 1
            crumbs = $(@el).find('ul.breadcrumbs')
            # Get the two Models before the last one.
            for crumb in window.History.models[-3...-1] then do (crumb) ->
                # Show them.
                crumbs.show()
                # Add the list item.
                li = $ '<li/>', 'class': 'entypo rightopen'
                # Add the link.
                li.append a = $ '<a/>', 'html': '#', 'text': crumb.get('title')
                # Append it.
                crumbs.append li

            # Trailing arrow.
            crumbs.append $ '<li/>', 'class': 'entypo rightopen', 'html': '&nbsp;'

        # If this tool is locked (= historical), show the time ago.
        if @step is 1 and @model.get('locked')? then @updateTime $(@el).find('em.ago')

        @

    serialize: -> assert false, 'Override with custom logic for this tool'

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion li.active div.content')