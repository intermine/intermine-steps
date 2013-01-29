require 'chaplin/lib/AssertException'
require 'chaplin/lib/LocalStorage'

InterMineSteps = require 'chaplin/Application'
History = require 'chaplin/models/History'

$ ->
    # Init history.
    (new History()).fetch
        'error': (coll, res) -> assert false, response
        'success': (coll, res) ->
            window.History = coll
            # Start the app.
            window.App = new InterMineSteps()