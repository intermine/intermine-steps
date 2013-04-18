Mediator = require 'chaplin/core/Mediator'

NextStepsView = require 'chaplin/views/NextSteps'

module.exports = class NextStepsAllView extends NextStepsView

    container: '#next' # where to render
    method:    'new'   # are we making a new step or continue previous?

    place: 'home'