InterMineSteps = require 'chaplin/core/Application'
History = require 'chaplin/models/History'

root = this

$ ->
    # Init history.
    (new History()).fetch
        'error': (coll, res) -> assert false, response
        'success': (coll, res) ->
            root.History = coll
            # Start the app.
            root.App = new InterMineSteps()
            root.App.initialize()