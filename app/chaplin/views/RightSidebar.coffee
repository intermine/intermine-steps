View = require 'chaplin/core/View'

NextStepsRightView = require 'chaplin/views/NextStepsRight'

module.exports = class RightSidebarView extends View

    container:       'aside#right'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-right'

    afterRender: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsRightView()

        @