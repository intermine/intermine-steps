Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

module.exports = class ResolveIdsToolView extends ToolView

    attach: ->
        super

        self = @

        switch @step
            when 1
                # An error handler...
                errors = (err) -> console.log err

                # Pass the following to the App from the client.
                opts =
                    'mine': root.App.service.im.root # which mine to connect to
                    'type': 'many' # one OR many
                    # Status messages and when user receives resolved identifiers.
                    'cb': (err, working, query) ->
                        # Has error happened?
                        return errors err if err
                        # Have input?
                        if query
                            return console.log 'query:', query

                            # Save the input proper.
                            self.model.set 'data', 'list': list
                            # Update the history, we are set.
                            Mediator.publish 'history:add', self.model
                            # Go on.
                            self.nextStep()

                'provided': {
                    'identifiers': [ 'MAD' ],
                    'type': 'Gene',
                    'organism': 'C. elegans'
                }

                # Build me an iframe with a channel.
                channel = @makeIframe '.app.container', errors

                # Make me an app.
                channel.invoke.apps 'identifier-resolution', opts

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