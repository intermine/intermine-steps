View = require '../core/View'

# The app when an error happens.
module.exports = class ErrorView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require "../templates/error-#{@options.template}"