Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

{ config } = require 'tools/config'

root = @

module.exports = class ChooseListToolView extends ToolView

    # Form the query constraining on a ĺist.
    queryForList = ({type, name}) ->
        'from': type
        'select': [ '*' ]
        'constraints': [ [ type, 'IN', name ] ]

    getPublisher = (guid) -> (type, id) ->
        Mediator.publish 'context:new', ['have:list', "type:#{type}", "have:one"], guid, id

    attach: ->
        super

        self = @

        switch @step

            # Input.
            when 1
                # Pass the following to the App from the client.
                opts =
                    'mine': config.root # which mine to connect to
                    'token': config.token # token so we can access private lists
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

                # Do we have a list selected already?
                opts.provided =
                    'selected': @model.get('data')?.list.name
                    'hidden': [ 'temp' ] # need to pass it now for the app to work

                # Build me an iframe with a channel.
                channel = @makeIframe '.app.container'

                # Make me an app.
                channel.invoke.apps 'choose-list', opts

            # Output.
            when 2
                guid = @model.get('guid')

                # Show a minimal Results Table.
                opts = _.extend {}, config,
                    'type': 'minimal'
                    'query': queryForList @model.get('data').list
                    'events':
                        # Fire off new context on cell selection.
                        'imo:click': getPublisher guid

                # Build me an iframe with a channel.
                channel = @makeIframe '.app.container'

                # Make me the table.
                channel.invoke.imtables opts

                # We have a list!
                Mediator.publish 'context:new', [ 'have:list', 'type:' + type ], guid

        @
