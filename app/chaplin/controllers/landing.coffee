Controller = require 'chaplin/core/Controller'
Mediator = require 'chaplin/core/Mediator'

LandingView = require 'chaplin/views/Landing'
ModalView = require 'chaplin/views/Modal'

module.exports = class LandingController extends Controller

    historyURL: (params) -> ''

    index: (params) ->
        @views.push new LandingView()
        @views.push new ModalView()
        @adjustTitle 'Welcome'