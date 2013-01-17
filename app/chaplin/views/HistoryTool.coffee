Chaplin = require 'chaplin'

GenericToolView = require 'chaplin/views/GenericTool'

module.exports = class HistoryToolView extends GenericToolView

    'containerMethod': 'html'
    'autoRender':      true

    getTemplateFunction: -> require 'chaplin/templates/history-tool'

    getTemplateData: -> @model.toJSON()

    afterRender: ->
        super

        # Add class and add order, 0-indexed!
        $(@el).attr('class', "#{@model.get('type')} step").attr('data-id', @model.id)

        # Init "time ago" updater.
        @updateTime()

        # Capture onclick if we want to visit a step in a history.
        @delegate 'click', '', -> Chaplin.mediator.publish 'app:oldTool', @model

        # Reset active status of this step.
        Chaplin.mediator.subscribe 'step:activate', (modelCid) =>
            if modelCid is @model.cid then $(@el).addClass('active')
            else $(@el).removeClass('active')

        @