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

        # Start checking for breadcrumbs to show.
        @checkCrumbs()

        # Init "time ago" updater.
        if @model.get('locked')? then @updateTime $(@el).find('em.ago')

        @

    # Check for latest breadcrumbs to show.
    checkCrumbs: =>
        collection = window.History

        if collection.length isnt 0
            # Clear any previous ones first.
            (crumbs = $(@el).find('ul.breadcrumbs')).html('')
            # Get the three Models before the last one.
            for crumb in collection.models[-3...] then do (crumb) ->
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

        # Check again later on.
        @timeouts.push setTimeout @checkCrumbs, 1000

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion li.active div.content')