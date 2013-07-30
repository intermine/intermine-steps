Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

{ config } = require 'tools/config'

root = @

module.exports = class ListWidgetToolView extends ToolView

    attach: ->
        super

        self = @

        switch @step

            # Input.
            when 1
                save = (data) ->
                    setTimeout -> # do you know why? Because Chaplin :)
                        # Save the input proper.
                        self.model.set 'data', data
                        # Update the history, we are set.
                        Mediator.publish 'history:add', self.model
                    , 0

                # Do we already have a previous List we are coming from?
                # And do we have extra params (in URL) that tell us which widget we want to see?
                if (data = @options?.previous?.data) and @options?.extra
                    [ type, id ] = @options.extra
                    # TODO: Jeebus standardize!
                    switch @options.previous.name
                        when 'ResolveIdsTool'
                            save
                                'widget':
                                    'type': type
                                    'id': id
                                'list':
                                    'name': data.list
                        
                        when 'ChooseListTool'                            
                            save
                                'widget':
                                    'type': type
                                    'id': id
                                'list': data.list

                        else throw 'We do not know this incoming tool yet, fix it.'

                # Pass the following to the App from the client.
                opts =
                    'mine': config.root # which mine to connect to
                    'token': config.token # token so we can access private lists
                    # Status messages and when user submits a list.
                    'cb': (err, working, list) ->
                        # Has error happened?
                        throw err if err
                        # Have input? Override our list selection, otherwise keep the widget config.
                        save _.extend({}, self.model.get('data'), { 'list': list }) if list

                # Do we have a list selected already?
                opts.provided =
                    'selected': @model.get('data')?.list.name
                    'hidden': [ 'temp' ] # need to pass it now for the app to work

                # Build me an iframe with a channel.
                channel = @makeIframe '.iframe.app.container', (err) ->
                    throw err if err

                # Make me an app.
                channel.invoke.apps 'choose-list', opts

            # Output.
            when 2
                # This is a new instance, need to get data from Model only.
                { widget, list } = @model.get('data')

                # To show a list widget I need the type, the widget id and the list name.
                opts = _.extend {}, widget,
                    'mine': config.mine # which mine to connect to
                    'token': config.token # token so we can access private lists
                    'list': list.name

                # Build me an iframe with a channel.
                channel = @makeIframe '.iframe.app.container', (err) ->
                    throw err if err

                # Make me a list widget.
                channel.invoke.widgets opts

        @