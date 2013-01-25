require 'chaplin/lib/AssertException'
require 'chaplin/lib/LocalStorage'

InterMineSteps = require 'chaplin/Application'
History = require 'chaplin/models/History'

$ ->
    # Init the history (from LocalStorage).
    window.History = new History()
    
    # Start the app.
    window.App = new InterMineSteps()