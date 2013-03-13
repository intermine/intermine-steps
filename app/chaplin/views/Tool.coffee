Mediator = require 'chaplin/core/Mediator'
Tool = require 'chaplin/models/Tool'

GenericToolView = require 'chaplin/views/GenericTool'
CrumbView = require 'chaplin/views/Crumb'

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

        # Set the step.
        @step = @options.step or 1

        # Listen to Mediator requesting different pages.
        Mediator.subscribe 'tool:step', (@step) =>
            @render()
        , @

    attach: ->
        super

        # A list of breadcrumb ids we have rendered.
        @crumbs = []

        name = @model.get('name')
        assert name, 'Name of the tool is not provided'

        # Render a specific step into our accordion template.
        content = $(@el).find("ul.accordion li[data-step='#{@step}'] div.content")
        content.html (require("tools/#{name}/step-#{@step}"))(@getTemplateData())

        # Start checking for breadcrumbs to show.
        @checkCrumbs()

        # Init "time ago" updater for models that are done.
        if @model.get('locked')? then @updateTime $(@el).find('em.ago')

        @

    # Check for latest breadcrumbs to show.
    checkCrumbs: =>
        collection = window.History

        if collection.length isnt 0
            # Get the 3 Models before the last one (current one).
            models = collection.models[-3...]
            # Have we already rendered all 3 of them?
            guids = ( model.get('guid') for model in models )
            unless window.Utils.arrayEql @crumbs, guids
                # Save for next time.
                @crumbs = guids
                # Clear any previous ones first.
                crumbs = $(@el).find('ul.breadcrumbs')
                ( v.dispose() for v in @views )
                crumbs.html('')

                # Get the three Models before the last one.
                for crumb in models then do (crumb) =>
                    # Show them.
                    crumbs.show()
                    # Add the single crumb as a View.
                    @views.push view = new CrumbView 'model': crumb
                    # Append it.
                    crumbs.append view.el

        # Check again later on.
        @timeouts.push setTimeout @checkCrumbs, 1000

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion li.active div.content')