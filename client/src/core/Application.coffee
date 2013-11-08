require './AssertException' # assertions
require './Console'         # console
require './Utils'           # utilities

Dispatcher = require './Dispatcher'
Mediator   = require './Mediator'
Layout     = require './Layout'
Controller = require './Controller'

{ registry, config } = require '/steps/tools/config'

root = @

# The application object.
module.exports = class InterMineSteps extends Chaplin.Application

    title: 'InterMine Steps'

    # Bootstrap.
    start: ->
        # Layout listens for click events & delegates internal links to router.
        @initLayout()

        # Listen for context changes.
        @initRegistry()

        super

    # Override standard layout initializer.
    initLayout: ->
        root.Layout = new Layout
            'title': @title
            'openExternalToBlank': true

    initRegistry: ->
        # Listen to context changes e.g.: we have a list.
        Mediator.subscribe 'context:new', (context=[], guid, opts...) =>
            # Find all tools that fully match part or all of the context.
            for tool in registry
                for variant in tool.labels
                    assert variant.place, 'Placement for a tool variant not provided'

                    # Match? Accept empty context.
                    if !_.difference(variant.context or [], context).length
                        # Form the new object.
                        obj = _.clone variant

                        # Convert to PascalCase to get the name.
                        obj.name = window.Utils.hyphenToPascal tool.slug
                        # Parent keys.
                        ( obj[key] = tool[key] for key in [ 'slug', 'help' ] )

                        # Grab the Model.
                        try
                            Model =  require "/steps/tools/#{obj.name}/Model"
                            model = new Model()
                        catch e
                            Chaplin.helpers.redirectTo '500'
                            assert false, "Unknown tool `#{obj.name}`"

                        # Enhance the obj with extra info from the Model.
                        obj.type = model.get('type')

                        # Add the guid information (when continuing).
                        obj.guid = guid if guid

                        # Cleanup.
                        model.dispose()

                        # Pass on options as extra params.
                        if opts.length isnt 0 then obj.extra = (obj.extra or []).concat opts

                        # Fire this object to no one in particular.
                        Mediator.publish 'context:render', variant.place, context, obj, opts
        , @