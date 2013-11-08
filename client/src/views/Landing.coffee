Mediator         = require '../core/Mediator'
View             = require '../core/View'

NextStepsAllView = require './NextStepsAll'

template         = require '../templates/landing'

{ registry }     = require '/steps/tools/config'

root = @

# The app when you first land on it.
module.exports = class LandingView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> template

    attach: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsAllView()

        # App search.
        @delegate 'keyup', 'input#search', (e) -> Mediator.publish 'app:search', $(e.target).val()

        # Remove `app`.
        $('body').removeClass('app')

        @