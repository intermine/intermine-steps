Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

module.exports = class ChooseListToolView extends ToolView

    attach: ->
        super

        self = @

        switch @step
            when 1
                # Pass the following to the App from the client.
                opts =
                    'mine': root.App.service.im.root # which mine to connect to
                    'token': root.App.service.im.token # token so we can access private lists
                    # Status messages and when user submits a list.
                    'cb': (err, working, list) ->
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

                # Do we have a list selected already?
                opts.provided =
                    'selected': @model.get('data')?.list.name
                    'hidden': [ 'temp' ] # need to pass it now for the app to work

                # Build me an iframe with a channel.
                channel = @makeIframe '.app.container'

                # Make me an app.
                channel.invoke.apps 'choose-list', opts

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