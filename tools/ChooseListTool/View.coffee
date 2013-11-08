Mediator = require '/steps/client/src/core/Mediator'
ToolView = require '/steps/client/src/views/Tool'

{ config } = require '../config'

root = @

module.exports = class ChooseListToolView extends ToolView

    # Form the query constraining on a list.
    queryForList = ({ type, name }) ->
        'from': type
        'select': [ '*' ]
        'constraints': [ [ type, 'IN', name ] ]

    attach: ->
        super

        self = @

        switch @step

            # Input.
            when 1
                # Pass the following to the App from the client.
                opts =
                    'mine': config.mine # which mine to connect to
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
                channel = @channel {
                    'target': '.iframe.app.container'
                    'scope': 'apps-a'
                }

                # Make me an app.
                channel.trigger 'load', 'choose-list', opts

            # Output.
            when 2
                # This is a new instance, need to get data from Model only.
                guid = @model.get('guid')
                { list } = @model.get('data')

                # Show a minimal Results Table.
                opts = _.extend {}, config,
                    'type': 'minimal'
                    'query': queryForList list
                    'events':
                        # Fire off new context on cell selection.
                        'imo:click': (type, id) ->
                            Mediator.publish 'context:new', [
                                'have:list'
                                "type:#{type}"
                                'have:one'
                            ], guid, id

                # Build me an iframe with a channel.
                channel = @channel {
                    'target': '.iframe.app.container'
                    'scope': 'imtables'
                }

                # Make me the table.
                channel.trigger 'show', opts

                # We have a list!
                Mediator.publish 'context:new', [
                    'have:list'
                    "type:#{list.type}"
                ], guid

        @