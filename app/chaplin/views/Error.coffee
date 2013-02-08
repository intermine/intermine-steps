View = require 'chaplin/core/View'

module.exports = class ErrorView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require "chaplin/templates/#{@options.template}"