root = this

$ ->
    # Check for localStorage & pushState support.
    unless Modernizr.localstorage and Modernizr.history
        View = require './views/Error'
        new View 'template': 'no-html5'
    else
        InterMineSteps = require './core/Application'
        routes         = require './core/Routes'
        History        = require './models/History'

        # Init history.
        (new History()).bootup (collection) ->
            # Make globally available.
            root.History = collection
            # Start the app.
            root.App = new InterMineSteps {
                'controllerPath':   '/steps/client/src/controllers/'
                'controllerSuffix': ''
                routes
            }