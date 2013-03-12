Chaplin = require 'chaplin'

require 'chaplin/core/AssertException' # assertions
require 'chaplin/core/Console'         # console
require 'chaplin/core/Utils'           # utilities

Dispatcher = require 'chaplin/core/Dispatcher'
Mediator = require 'chaplin/core/Mediator'
Layout = require 'chaplin/core/Layout'
Routes = require 'chaplin/core/Routes'

Registry = require 'tools/Registry'

# The application object.
module.exports = class InterMineSteps extends Chaplin.Application

    title: 'InterMine Steps'

    # Default state of the History View.
    showHistory: true

    initialize: ->
        super

        @dispatcher = new Dispatcher
            'controllerPath':   'chaplin/controllers/'
            'controllerSuffix': ''
        
        @initLayout()

        @initRegistry()

        # Register all routes and start routing
        @initRouter Routes

        # Freeze the application instance to prevent further changes
        # Object.freeze? @

    # Override standard layout initializer.
    initLayout: ->
        # Use an application-specific Layout class. Currently this adds
        # no features to the standard Chaplin Layout, it’s an empty placeholder.
        @layout = new Layout
            'title': @title
            'openExternalToBlank': true

    initRegistry: ->
        # Listen to context changes.
        Mediator.subscribe 'context:new', (context, guid) =>
            assert context and context instanceof Array, 'No context provided or context not a list of terms'

            # Find all tools that fully match part or all of the context.
            for tool in Registry
                for variant in tool.labels
                    if _.difference(variant.context, context).length is 0
                        # Form the new object.
                        obj = _.clone variant

                        # Convert to PascalCase to get the name.
                        obj.name = window.Utils.hyphenToPascal tool.slug
                        # Parent keys.
                        ( obj[key] = tool[key] for key in [ 'slug', 'help' ] )

                        # Grab the Model.
                        try
                            Model =  require "/tools/#{obj.name}/Model"
                            model = new Model()
                        catch e
                            @publishEvent '!router:routeByName', 500
                            assert false, "Unknown tool `#{obj.name}`"

                        # Enhance the obj with extra info from the Model.
                        obj.type = model.get('type')

                        # Add the guid information (when continuing).
                        obj.guid = guid if guid

                        # Cleanup.
                        model.dispose()

                        # Fire this object to no one in particular.
                        Mediator.publish 'context:render', context, obj
        , @