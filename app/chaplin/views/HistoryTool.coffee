Chaplin = require 'chaplin'

Mediator = require 'chaplin/lib/Mediator'

GenericToolView = require 'chaplin/views/GenericTool'

module.exports = class HistoryToolView extends GenericToolView

    'containerMethod': 'html'
    'autoRender':      true

    getTemplateFunction: -> require 'chaplin/templates/history-tool'

    getTemplateData: -> @model.toJSON()

    initialize: ->
        super

        # Reset active status of this step.
        Mediator.subscribe 'step:activate', (model) =>
            if @model.cid is model.cid then $(@el).addClass('active')
            else $(@el).removeClass('active')
        , @

        @

    afterRender: ->
        super

        # Add class and add order, 0-indexed!
        $(@el).attr('class', "#{@model.get('type')} step").attr('data-id', @model.id)

        # Init "time ago" updater.
        @updateTime $(@el).find('em.ago')

        # Capture onclick if we want to visit a step in a history.
        @delegate 'click', '', ->
            Mediator.publish 'app:oldTool', @model
            # Activate the element.
            Mediator.publish 'step:activate', @model
            # Lock the model.
            @model.set 'locked', true
            # But also route to it.
            Mediator.publish 'router:route', @model.toJSON()

        @