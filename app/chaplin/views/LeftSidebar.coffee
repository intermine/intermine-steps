Chaplin = require 'chaplin'

module.exports = class LeftSidebarView extends Chaplin.View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    afterRender: ->
        super

        # Handle sidebar clicks, they start a new history.
        @delegate 'click', 'a', (e) ->
            Chaplin.mediator.publish 'app:changeTool', $(e.target).attr('data-tool')

        @