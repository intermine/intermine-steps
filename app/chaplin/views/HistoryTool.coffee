Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

GenericToolView = require 'chaplin/views/GenericTool'

module.exports = class HistoryToolView extends GenericToolView

    'containerMethod': 'html'
    'autoRender':      true

    getTemplateFunction: -> require 'chaplin/templates/history-tool'

    getTemplateData: -> @model.toJSON()

    initialize: ->
        super

        # Re/set active status of this step.
        Mediator.subscribe 'history:activate', (guid) =>
            if @model.get('guid') is guid
                $(@el).addClass('active')
            else
                $(@el).removeClass('active')
        , @

        @

    afterRender: ->
        super

        # Add class and add order, 0-indexed!
        $(@el).attr('class', "#{@model.get('type')} step").attr('data-id', @model.id)

        # Init "time ago" updater.
        @updateTime $(@el).find('em.ago')

        @