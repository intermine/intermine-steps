Chaplin = require 'chaplin'

Tool = require 'chaplin/models/Tool'
Registry = require 'chaplin/models/Registry'

module.exports = class LeftSidebarView extends Chaplin.View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    getTemplateData: -> 'registry': Registry

    afterRender: ->
        super

        @delegate 'click', 'a', (e) ->
            name = $(e.target).attr('data-tool')
            Chaplin.mediator.publish 'router:route', name

        @