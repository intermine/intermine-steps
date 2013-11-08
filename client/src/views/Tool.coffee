Mediator        = require '../core/Mediator'
Tool            = require '../models/Tool'

GenericToolView = require './GenericTool'
CrumbView       = require './Crumb'

root = @

# Manage input, switching to output and rendering of breadcrumbs of a Tool in the main section of the app.
module.exports = class ToolView extends GenericToolView

    container:       '#widget'
    containerMethod: 'html'
    autoRender:      yes

    # Accordion template.
    getTemplateFunction: -> require '../templates/tool'

    getTemplateData: ->
        # Extend Model by the step.
        data = _.extend @model.toJSON(), 'step': @step
        
        # Further extend by previous step data if present.
        if @options.previous then data = _.extend data, 'previous': @options.previous?.data

        # Split extra?
        if (extra = @options.extra) and extra not instanceof Array
            @options.extra = extra.split(',')

        # Is this locked? Provide a root home.
        if data.locked? then data.root = root.History.models[-1...][0].attributes.guid

        # Nice ret.
        data

    initialize: ->
        super

        # Split extra?
        if (extra = @options.extra) and extra not instanceof Array
            @options.extra = extra.split(',')

        # Set the step.
        @step = @options.step or 1

    attach: ->
        super

        # A list of breadcrumb ids we have rendered.
        @crumbs = []

        name = @model.get('name')
        assert name, 'Name of the tool is not provided'

        # Render a specific step into our accordion template.
        content = $(@el).find("ul.accordion li[data-step='#{@step}'] div.content")
        content.html (require("/steps/tools/#{name}/step-#{@step}"))(@getTemplateData())

        # Start checking for breadcrumbs to show.
        @checkCrumbs()

        # Init "time ago" updater for models that are done.
        @updateTime $(@el).find('em.ago') if @model.get('locked')?

        @

    disposeIframe: ->
        # Clear any intervals on iframes.
        _.map(@intervals, clearInterval) if @intervals and @intervals instanceof Array

        # Dispose of the iframe.
        do @pomme.dispose if @pomme

    dispose: ->
        do @disposeIframe

        super

    # Check for latest breadcrumbs to show.
    checkCrumbs: =>
        collection = root.History

        if collection.length isnt 0
            # Get the 3 Models before the last one (current one).
            models = collection.models[-3...]
            # Have we already rendered all 3 of them?
            guids = ( model.get('guid') for model in models )
            unless root.Utils.arrayEql @crumbs, guids
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
        @timeouts.push setTimeout @checkCrumbs, 1e3

    # Get DOM for current step.
    getDOM: -> $(@el).find('ul.accordion > li.active > div.content')

    # Create/return a Pomme.js channel.
    channel: (opts) ->
        # Extend with our iframe template.
        template = require "../templates/iframe/#{opts.scope}"

        # Remove if present already.
        do @disposeIframe
        do $(opts.target).empty

        # Is on window...
        @pomme = new Pomme _.extend opts, { template }

        # Let me die for you.
        @pomme.on 'error', (err) ->
            throw "Pomme.js iframe error: #{err}"

        # Start auto-resizing (interval is cleared in `dispose`).
        @intervals ?= []
        @intervals.push setInterval =>
            if body = @pomme.iframe.el.document.body
                height = body.scrollHeight
                @pomme.iframe.node.style.height = "#{height}px"
        , 1e2

        # Over to you.
        @pomme