View = require 'chaplin/core/View'

NextStepsAllView = require 'chaplin/views/NextStepsAll'

module.exports = class LeftSidebarView extends View

    container:       'aside#left'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-left'

    attach: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsAllView()

        @