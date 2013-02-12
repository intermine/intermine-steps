InterMineSteps = require 'chaplin/core/Application'
History = require 'chaplin/models/History'

root = this

$ ->
    # Init history.
    (new History()).bootup (collection) ->
        # Make globally available.
        root.History = collection
        # Start the app.
        root.App = new InterMineSteps()
        root.App.initialize()