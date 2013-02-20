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

    initialize: ->
        super

        # Production or development env?
        @env = 'dev' # if location.hostname is 'intermine-steps.labs.intermine.org' then 'prod' else 'dev'

        @dispatcher = new Dispatcher
            'controllerPath':   'chaplin/controllers/'
            'controllerSuffix': ''
        
        @initLayout()

        @initRegistry()

        # Register all routes and start routing
        @initRouter Routes

        # Freeze the application instance to prevent further changes
        Object.freeze? @

    # Override standard layout initializer.
    initLayout: ->
        # Use an application-specific Layout class. Currently this adds
        # no features to the standard Chaplin Layout, it’s an empty placeholder.
        @layout = new Layout
            'title': @title
            'openExternalToBlank': true

    # Listen to context changes.
    initRegistry: ->
        for key, map of Registry then do (key, map) =>
            # This is what we have.
            Mediator.subscribe "context:#{key}", (guid) =>
                for obj in map
                    # Convert to PascalCase to get the name.
                    name = window.Utils.hyphenToPascal obj.slug

                    # Grab the Model.
                    try
                        Model =  require "/tools/#{name}/Model"
                        model = new Model()
                    catch e
                        @publishEvent '!router:routeByName', 500
                        assert false, "Unknown tool `#{name}`"

                    # Enhance the obj with extra info from the model.
                    obj.type = model.get('type')

                    # Add the guid information (when continuing).
                    obj.guid = guid

                    # Cleanup.
                    model.dispose()

                    # These guys might like this.
                    Mediator.publish "contextRender:#{key}", obj
            , @