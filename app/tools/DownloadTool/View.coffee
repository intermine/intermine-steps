Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

module.exports = class DownloadToolView extends ToolView

    attach: ->
        super

        switch @step
            when 1
                data = {}
                # Do we have a list coming from a previous step? Make into a PQ.
                list = @options?.previous?.data?.list
                if list then data.pq = "<xml key=\"#{list.key}\"><item select=\"random\"></item></xml>"
                
                # Do we have an extra param?
                format = @options?.extra
                if format then data.format = format

                # Do we have both values set? Then skip to the results...
                if data.pq and data.format then @exportData data

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