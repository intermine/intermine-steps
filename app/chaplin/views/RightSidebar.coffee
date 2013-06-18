View               = require 'chaplin/core/View'

NextStepsRightView = require 'chaplin/views/NextStepsRight'

template           = require 'chaplin/templates/sidebar-right'

# Why the hell is this class needed I have no idea...
module.exports = class RightSidebarView extends View

    container:       'aside#right'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> template

    attach: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsRightView()

        @