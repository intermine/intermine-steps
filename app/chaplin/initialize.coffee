# Both exposed on window.
require 'chaplin/lib/AssertException'
require 'chaplin/lib/LocalStorage'

FluxMine = require 'chaplin/Application'
History = require 'chaplin/models/History'

$ ->
    # Init the history.
    window.History = new History()
    # Start the app.
    window.App = new FluxMine()
    window.App.initialize()