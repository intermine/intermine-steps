Mediator = require '/steps/client/src/core/Mediator'
ToolView = require '/steps/client/src/views/Tool'

{ config } = require '../config'

root = @

module.exports = class ResolveIdsToolView extends ToolView

    # Form the query constraining on a list.
    queryForList = ({ input, list, query }) ->
        'from': input.type
        'select': [ '*' ]
        'constraints': [ [ input.type, 'IN', list ] ]

    # Turn a query to be into a list and call back with its name.
    queryToList = (obj, cb) ->
        service = new intermine.Service
            'root': config.mine
            'token': config.token
            'errorHandler': cb

        service.query obj, (q) ->
            q.saveAsList
                'name': +new Date
                'tags': [ 'app', 'identifier-resolution' ]
            , ({ name }) ->
                cb null, name

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
                    'type': 'many' # one OR many
                    # The default identifers in FlyMine.
                    'provided':
                        'identifiers': [ 'CG9151', 'FBgn0000099', 'CG3629', 'TfIIB', 'Mad', 'CG1775', 'CG2262', 'TWIST_DROME', 'tinman', 'runt', 'E2f', 'CG8817', 'FBgn0010433', 'CG9786', 'CG1034', 'ftz', 'FBgn0024250', 'FBgn0001251', 'tll', 'CG1374', 'CG33473', 'ato', 'so', 'CG16738', 'tramtrack', 'CG2328', 'gt' ]
                        'type': 'Gene'
                        'organism': 'D. melanogaster'
                    
                    # Status messages and when user receives resolved identifiers.
                    'cb': (err, working, out) ->
                        # Has error happened?
                        throw err if err
                        # Have output?
                        if out and out.query
                            # Make it into a list (will get deleted anyway...).
                            queryToList out.query, (err, name) ->
                                throw err if err
                                out.list = name
                                # Save the input proper.
                                self.model.set 'data', out
                                # Update the history, we are set.
                                Mediator.publish 'history:add', self.model

                # Do we have input already?
                opts.provided = @model.get('data')?.input or opts.provided # default is rubbish

                # Build me an iframe with a channel.
                channel = @channel {
                    'target': '.iframe.app.container'
                    'scope': 'apps-a'
                }

                # Make me an app.
                channel.trigger 'load', 'identifier-resolution', opts

            # Output.
            when 2
                # This is a new instance, need to get data from Model only.
                guid = @model.get('guid')
                data = @model.get('data')

                # Show a minimal Results Table.
                opts = _.extend {}, config,
                    'type': 'minimal'
                    'query': queryForList data
                    'events':
                        # Fire off new context on cell selection.
                        'imo:click': (type, id, obj) ->
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
                    "type:#{data.input.type}"
                ], guid

        @