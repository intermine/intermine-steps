Chaplin = require 'chaplin'

Tool = require 'chaplin/models/Tool'

module.exports = class LeftSidebarView extends Chaplin.View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    afterRender: ->
        super

        # Handle sidebar clicks, they start a new history.
        @delegate 'click', 'a', (e) ->
            name = $(e.target).attr('data-tool')
            model = new Tool 'name': name
            Chaplin.mediator.publish 'app:newTool', model

        @