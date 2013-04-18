Mediator = require 'chaplin/core/Mediator'

Registry = require 'tools/Registry'

NextStepsView = require 'chaplin/views/NextSteps'

module.exports = class NextStepsRightView extends NextStepsView

    container: '#continue' # where to render
    method:    'continue'  # are we making a new step or continue previous?

    place: 'right'