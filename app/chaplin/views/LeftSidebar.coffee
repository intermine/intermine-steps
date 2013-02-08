View = require 'chaplin/core/View'

NextStepsLeftView = require 'chaplin/views/NextStepsLeft'

module.exports = class LeftSidebarView extends View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    afterRender: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsLeftView()

        @