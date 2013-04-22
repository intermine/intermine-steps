Controller = require 'chaplin/core/Controller'

ErrorView = require 'chaplin/views/Error'

module.exports = class ErrorController extends Controller

    404: (params) ->
        @views.push new ErrorView 'template': 404
        @adjustTitle '404'

    500: (params) ->
        @views.push new ErrorView 'template': 500
        @adjustTitle '500'