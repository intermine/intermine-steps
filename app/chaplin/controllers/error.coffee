Controller = require 'chaplin/core/Controller'

ErrorView = require 'chaplin/views/Error'

module.exports = class ErrorController extends Controller

    historyURL: (params) -> ''

    404: (params) ->
        console.log params
        @views.push new ErrorView 'template': 404