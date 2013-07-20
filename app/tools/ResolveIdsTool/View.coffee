Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

module.exports = class ResolveIdsToolView extends ToolView

    attach: ->
        super

        switch @step
            when 1
                # Upload identifiers to resolve app.
                root.App.service.apps.load 'identifier-resolution', '.app.container',
                    # A callback called at least once.
                    cb: (err, working, list) ->
                        # Has error happened?
                        throw err if err
                        # Status.
                        console.log working, list

            # We have resolved the identifiers & have a list reference.
            when 2
                # Expand on us.
                { type, list } = @model.get('data')

                # Form the query constraining on a ĺist.
                query =
                    'model':
                        'name': 'genomic'
                    'select': [
                        "#{type}.*"
                    ]
                    'constraints': [
                        { 'path': type, 'op': 'IN', 'value': list }
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