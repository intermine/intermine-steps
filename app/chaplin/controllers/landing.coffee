Controller = require 'chaplin/core/Controller'
Mediator = require 'chaplin/core/Mediator'

LandingView = require 'chaplin/views/Landing'

module.exports = class LandingController extends Controller

    historyURL: (params) -> ''

    index: (params) ->
        @views.push new LandingView()
        @adjustTitle 'Welcome'