Controller = require '../core/Controller'
Mediator = require '../core/Mediator'

LandingView = require '../views/Landing'

module.exports = class LandingController extends Controller

    index: (params) ->
        @views.push new LandingView()
        @adjustTitle 'Welcome'