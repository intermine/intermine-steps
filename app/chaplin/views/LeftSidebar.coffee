Chaplin = require 'chaplin'

Tool = require 'chaplin/models/Tool'
Registry = require 'tools/Registry'

module.exports = class LeftSidebarView extends Chaplin.View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    getTemplateData: -> 'registry': Registry

    afterRender: ->
        super

        @delegate 'click', 'a', (e) ->
            # Reset the currently active step, we start anew.
            Chaplin.mediator.publish 'step:deactivate'
            # Set the new route.
            name = $(e.target).attr('data-tool')
            Chaplin.mediator.publish 'router:route', name

        @