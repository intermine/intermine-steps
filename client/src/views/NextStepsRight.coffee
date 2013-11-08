Mediator      = require '../core/Mediator'

NextStepsView = require './NextSteps'

# Next steps to go to on the right.
module.exports = class NextStepsRightView extends NextStepsView

    container: '#continue' # where to render
    method:    'continue'  # are we making a new step or continue previous?

    place: 'right'