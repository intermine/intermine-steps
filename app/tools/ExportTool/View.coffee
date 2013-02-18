Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class ExportToolView extends ToolView

    afterRender: ->
        super

        switch @step
            when 1
                # Do we have a PathQuery coming from a previous step?
                data = @options?.previous?.data
                if data
                    # As if make a list into a PathQuery.
                    data.pq = "<xml key=\"#{data.list.key}\"><item select=\"random\"></item></xml>"
                    delete data.list
                    @exportData data

        # Use a "list" from step #1.
        @delegate 'click', '#submit', =>
            dom = @getDOM()
            # Set on the model.
            @exportData
                'pq': dom.find('textarea.pq').val()
                'format': dom.find('select.format').val()

    exportData: (data) =>
        assert data, 'No input data provided'

        # Set on model.
        @model.set 'data': data
        # Update the history.
        Mediator.publish 'history:add', @model
        # Change the step.
        Mediator.publish 'tool:step', @step += 1