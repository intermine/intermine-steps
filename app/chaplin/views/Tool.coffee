Mediator = require 'chaplin/core/Mediator'
Tool = require 'chaplin/models/Tool'

GenericToolView = require 'chaplin/views/GenericTool'

module.exports = class ToolView extends GenericToolView

    container:       'div#widget'
    containerMethod: 'html'
    autoRender:      true

    # Accordion template.
    getTemplateFunction: -> require 'chaplin/templates/tool'

    getTemplateData: ->
        # Extend Model by the step.
        data = _.extend @model.toJSON(), 'step': @step
        # Further extend by previous step data if present.
        if @options.previous then data = _.extend data, 'previous': @options.previous?.data
        # Nice ret.
        data

    initialize: ->
        super

        # Do we have contexts for a tool?
        if @contexts
            # Register listener.
            for name, label of @contexts then do (name, label) =>
                Mediator.subscribe "context:#{name}", (next) =>
                    # Add a link to us.
                    next.add @model.get('slug'), label
                , @

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
                li.append a = $ '<a/>', 'href': "/tool/#{crumb.get('slug')}/id/#{crumb.get('guid')}", 'text': crumb.get('title')
                # Append it.
                crumbs.append li

            # Trailing arrow.
            crumbs.append $ '<li/>', 'class': 'entypo rightopen', 'html': '&nbsp;'

        # Init "time ago" updater.
        if @model.get('locked')? then @updateTime $(@el).find('em.ago')

        @

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion li.active div.content')