Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

module.exports = class ChooseListToolView extends ToolView

    attach: ->
        super

        switch @step
            when 1
                @iframe '.app.container'

                return

                provided = 'hidden': [ 'temp' ]
                if name = @model.get('data')?.list?.name then provided.selected = name

                # Status messages and when user submits a list.
                handler = (err, working, list) ->
                    console.log err, 'Working', working, 'view', self.cid, list
                    # Has error happened?
                    throw err if err
                    # Have input?
                    if list
                        # Save the input proper.
                        self.model.set 'data', 'list': list
                        # Update the history, we are set.
                        Mediator.publish 'history:add', self.model
                        # Go on.
                        self.nextStep()

            when 2
                # Expand on us.
                { type, name } = @model.get('data').list

                # Form the query constraining on a ĺist.
                query =
                    'model':
                        'name': 'genomic'
                    'select': [
                        "#{type}.*"
                    ]
                    'constraints': [
                        { 'path': type, 'op': 'IN', 'value': name }
                    ]

                # Show a minimal Results Table.
                $(@el).find('.im-table').imWidget
                    'type': 'minimal'
                    'service': root.App.service.im
                    'query': query
                    'events':
                        # Fire off new context on cell selection.
                        'imo:click': (type, id) =>
                            Mediator.publish 'context:new', [
                                'have:list'
                                'type:' + type
                                'have:one'
                            ], @model.get('guid'), id

                # We have a list!
                Mediator.publish 'context:new', [ 'have:list', 'type:' + type ], @model.get('guid')

        @