Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

NextStepsLandingView = require 'chaplin/views/NextStepsLanding'

root = @

module.exports = class LandingView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require "chaplin/templates/landing-#{root.App.env}"

    attach: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsLandingView()

        @