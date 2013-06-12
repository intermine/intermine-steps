Mediator = require 'chaplin/core/Mediator'

NextStepsView = require 'chaplin/views/NextSteps'

module.exports = class NextStepsHeaderView extends NextStepsView

    container: '#always-on' # where to render
    method:    'new'        # are we making a new step or continue previous?

    place: 'header'

    labelClass: 'button -steps-ui' # extra class for a label

    getTemplateFunction: -> require 'chaplin/templates/next-steps-header'