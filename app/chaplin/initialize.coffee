root = this

$ ->  
    # Check for localStorage & pushState support.
    unless Modernizr.localstorage and Modernizr.history
        View = require 'chaplin/views/Error'
        new View 'template': 'no-html5'
    else
        InterMineSteps = require 'chaplin/core/Application'
        History = require 'chaplin/models/History'

        # Init history.
        (new History()).bootup (collection) ->
            # Make globally available.
            root.History = collection
            # Start the app.
            root.App = new InterMineSteps()
            root.App.initialize()