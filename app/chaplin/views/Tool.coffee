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
    getTemplateData: -> _.extend @model.toJSON(), 'step': @step

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
        if next = @model.get('next')
            for k, v of next
                # Do we match on step?
                if v.step is @step
                    # Remove placeholder.
                    aside.find('p').remove()
                    # Append the link.
                    ul.append li = $ '<li/>'
                    li.append a = $ '<a/>', 'href': "/tool/#{k}/continue", 'text': v.text

        # Do we have breadcrumbs to show?
        if window.History.length isnt 0
            crumbs = $(@el).find('ul.breadcrumbs')
            # Get the two Models before the last one.
            for crumb in window.History.models[-2...] then do (crumb) ->
                # Show them.
                crumbs.show()
                # Add the list item.
                li = $ '<li/>', 'class': 'entypo rightopen'
                # Add the link.
                li.append a = $ '<a/>', 'href': "/tool/#{crumb.get('slug')}/history/#{crumb.get('row')}/step/#{crumb.get('col')}", 'text': crumb.get('title')
                # Append it.
                crumbs.append li

            # Trailing arrow.
            crumbs.append $ '<li/>', 'class': 'entypo rightopen', 'html': '&nbsp;'

        # Init "time ago" updater.
        if @options.historical? then @updateTime $(@el).find('em.ago')

        @

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion li.active div.content')