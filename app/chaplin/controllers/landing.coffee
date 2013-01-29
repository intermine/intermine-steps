Chaplin = require 'chaplin'

LandingView = require 'chaplin/views/Landing'

module.exports = class LandingController extends Chaplin.Controller

    historyURL: (params) -> ''

    index: (params) ->
        new LandingView()