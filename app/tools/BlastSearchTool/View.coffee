Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class UploadListToolView extends ToolView
    
    afterRender: ->
        super

        switch @step
            when 2
                # We have a list!
                Mediator.publish 'context:i:haveList', @model.get('guid')

        @delegate 'click', '#submit', ->
            # Get the DOM data.
            item = @getDOM().find('form input').val()

            unless item
                Mediator.publish 'modal:render',
                    'title': 'Oops &hellip;'
                    'text': 'You have not provided any input.'
            else                
                # Make "item" into a "list".
                @model.set 'data', 'list':
                    key: 'blast'
                    name: 'From a BLAST Search'
                    items: [ item ]

                # Update the history.
                Mediator.publish 'history:add', @model
                # Change the step.
                Mediator.publish 'tool:step', @step += 1

        @