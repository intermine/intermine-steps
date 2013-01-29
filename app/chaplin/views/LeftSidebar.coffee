Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/lib/View'

Tool = require 'chaplin/models/Tool'
Registry = require 'tools/Registry'

module.exports = class LeftSidebarView extends View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    getTemplateData: -> 'registry': Registry

    afterRender: ->
        super

        @delegate 'click', 'a', (e) ->
            # Reset the currently active step, we start anew.
            Mediator.publish 'step:deactivate'
            # Set the new route.
            name = $(e.target).attr('data-tool')
            Mediator.publish 'router:route', name

        @