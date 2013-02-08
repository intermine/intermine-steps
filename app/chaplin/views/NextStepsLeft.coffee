Mediator = require 'chaplin/core/Mediator'

NextStepsView = require 'chaplin/views/NextSteps'

module.exports = class NextStepsLeftView extends NextStepsView

    container: '#next' # where to render
    method:    'new'   # are we making a new step or continue previous?

    initialize: ->
        super

        # Render on us.
        Mediator.subscribe 'contextRender:i:onLeft', @add, @

    afterRender: ->
        super

        # We are in the left sidebar.
        Mediator.publish 'context:i:onLeft'

        @