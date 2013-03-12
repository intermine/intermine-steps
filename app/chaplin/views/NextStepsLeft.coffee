Mediator = require 'chaplin/core/Mediator'

NextStepsView = require 'chaplin/views/NextSteps'

root = @

module.exports = class NextStepsLeftView extends NextStepsView

    container: '#next' # where to render
    method:    'new'   # are we making a new step or continue previous?

    context: [ 'homepage', 'bar', 'baz' ]

    initialize: ->
        super

        # Render tool labels on us
        Mediator.subscribe 'context:render', (context, obj) =>
            if root.Utils.arrayEql context, @context
                @add obj
        , @

    attach: ->
        super

        # Directly render tool labels on us.
        Mediator.publish 'context:new', @context

        @