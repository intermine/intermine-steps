Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

module.exports = class ListWidgetToolView extends ToolView

    getTemplateData: ->
        data = super

        switch @step
            when 1
                # From previous step.
                if @options.previous
                    _.extend data, 'list': @options.previous.data.list
                # When looking at a history.
                if @model.get('locked')?
                    _.extend data, 'list': @model.get('data').list

        data

    attach: ->
        super

        switch @step
            when 1
                # Do we already have list input from previous Model?
                if (data = @options?.previous?.data)
                    { list, type } = data
                    [ which, widget ] = @options.extra
                    
                    # Save the input proper.
                    return @save
                        'list': list
                        'objType': type
                        'widget':
                            'id': widget
                            'type': which

                # Capture submit clicks.
                @delegate 'click', '#submit', =>
                    # Get the identifiers.
                    name = $(@el).find('input[name="list"]').val()

                    # Do we have any?
                    if name.length is 0
                        return Mediator.publish 'modal:render',
                            'title': 'Oops &hellip;'
                            'text': 'No list selected.'

                    # Replace the list name.
                    data = @model.get('data')
                    data.list = name

                    # Save it then.
                    @save data

            when 2
                assert (data = @model.get('data')), 'Input list not provided'

                # Finally display.
                root.App.service.list[data.widget.type] data.widget.id, data.list, '.bootstrap'

        @

    save: (obj) ->
        # Save the input proper.
        @model.set 'data', obj

        # Update the history, we are set.
        Mediator.publish 'history:add', @model

        # Next step.
        @nextStep()