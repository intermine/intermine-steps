Chaplin = require 'chaplin'

Registry = require 'tools/Registry'

module.exports = class LandingView extends Chaplin.View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/landing'

    getTemplateData: -> 'registry': Registry

    afterRender: ->
        super

        # Handle sidebar clicks, they start a new history.
        @delegate 'click', 'a', (e) ->
            name = $(e.target).attr('data-tool')
            Chaplin.mediator.publish 'router:route', name

        @