Controller = require 'chaplin/core/Controller'

LandingView = require 'chaplin/views/Landing'

module.exports = class LandingController extends Controller

    historyURL: (params) -> ''

    index: (params) ->
        @views.push new LandingView()
        @adjustTitle 'Welcome'