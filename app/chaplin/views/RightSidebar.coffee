View = require 'chaplin/core/View'

NextStepsRightView = require 'chaplin/views/NextStepsRight'

module.exports = class RightSidebarView extends View

    container:       'aside#right'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-right'

    attach: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsRightView

        @