Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

NextStepsLandingView = require 'chaplin/views/NextStepsLanding'

module.exports = class LandingView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/landing'

    afterRender: ->
        super

        # Load the appropriate Next Steps.
        @views.push new NextStepsLandingView()

        # Register actions.
        @delegate 'click', '#reset', @resetDatabase

        @

    # Clear LocalStorage and History Collection.
    resetDatabase: ->
        collection = window.History
        # LocalStorage.
        collection.storage.reset()
        # Collection itself.
        collection.reset()
        # Now do the sync.
        Backbone.sync 'update', collection