Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class ExportToolView extends ToolView

    afterRender: ->
        super

        switch @step
            when 1
                # Do we have a list coming from a previous step?
                list = @options?.previous?.data?.list
                if list
                    @selected = list
                    @exportData()

        # Use a "list" from step #1.
        @delegate 'click', '#submit', @exportData

    exportData: =>
        # Set on model.
        if @selected then @model.set 'data': { 'list': @selected }
        # Update the history.
        Mediator.publish 'history:add', @model
        # Change the step.
        Mediator.publish 'tool:step', @step += 1