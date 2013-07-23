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
                    'cb': (err, working, out) ->
                        # Has error happened?
                        return errors err if err
                        # Have input?
                        if out and out.query
                            # Save the input proper.
                            self.model.set 'data', out
                            # Update the history, we are set.
                            Mediator.publish 'history:add', self.model
                            # Go on.
                            self.nextStep()

                # Do we have input already?
                opts.provided = @model.get('data')?.input or {} # default is rubbish

                # Build me an iframe with a channel.
                channel = @makeIframe '.app.container', errors

                # Make me an app.
                channel.invoke.apps 'identifier-resolution', opts

            # We have resolved the identifiers & have a list reference.
            when 2
                # Expand on us.
                { input, query } = @model.get('data')

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
                Mediator.publish 'context:new', [ 'have:list', 'type:' + input.type ], @model.get('guid')

        @