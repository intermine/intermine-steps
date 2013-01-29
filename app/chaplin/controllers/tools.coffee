Chaplin = require 'chaplin'

module.exports = class ToolsController extends Chaplin.Controller

    historyURL: (params) -> ''

    index: ({ slug, row, col }) ->
        console.log slug, row, col