Mediator      = require '../core/Mediator'

NextStepsView = require './NextSteps'

# Landing page all tools available.
module.exports = class NextStepsAllView extends NextStepsView

    container: '#next' # where to render
    method:    'new'   # are we making a new step or continue previous?

    place: 'home'