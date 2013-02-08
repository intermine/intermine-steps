Mediator = require 'chaplin/core/Mediator'

NextStepsView = require 'chaplin/views/NextSteps'

module.exports = class NextStepsLandingView extends NextStepsView

    container: '#next' # where to render
    method:    'new'   # are we making a new step or continue previous?

    initialize: ->
        super

        # Render on us.
        Mediator.subscribe 'contextRender:i:onHomepage', @add, @

    afterRender: ->
        super

        # We are on the homepage.
        Mediator.publish 'context:i:onHomepage'

        @