Chaplin = require 'chaplin'

Mediator = require 'chaplin/lib/Mediator'
View = require 'chaplin/lib/View'

Registry = require 'tools/Registry'

module.exports = class LandingView extends View

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
            Mediator.publish 'router:route', name

        @