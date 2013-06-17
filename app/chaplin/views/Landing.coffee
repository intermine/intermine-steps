Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

NextStepsAllView = require 'chaplin/views/NextStepsAll'

{ registry } = require 'tools/config'

root = @

module.exports = class LandingView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/landing'

    attach: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsAllView()

        # App search.
        @delegate 'keyup', 'input#search', (e) -> Mediator.publish 'app:search', $(e.target).val()

        # Remove `app`.
        $('body').removeClass('app')

        @