Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

# Default lists to use, as if coming from the server.
lists = [
    {
        key: 'acme'
        name: 'ACME/Herman Inc.'
        items: [ 'Scott Golden', 'Ronan Buckley', 'Bevis Herman', 'Linus Melendez', 'Jameson Maddox' ]
    }, {
        key: 'caldwell'
        name: 'The Caldwell Trust'
        items: [ 'Caldwell Little', 'Hyatt Dudley', 'Herman Parks', 'Abdul Owens', 'Tyrone Banks' ]
    }
]

module.exports = class EnrichListToolView extends ToolView

    getTemplateData: ->
        switch @step
            when 1
                # Do I have a list selected on "me"?
                list = @model.get('data')?.list
                if list
                    # Is it a list from our internal storage?
                    found = false
                    for l in @lists when not found
                        if l.key is list.key
                            # Set us as "selected".
                            l.selected = true
                            found = true
                    unless found
                        # Add it to the store.
                        list.selected = true
                        @lists.push list
                    # Make it selected as a property on us.
                    @selected = list

                # Enhance with lists as if coming from the server.
                _.extend super, 'lists': @lists
            else
                super

    initialize: ->
        super

        # Define properties on us.
        @lists = @property lists

    attach: ->
        super

        switch @step
            when 1
                # Do we have a list set already? Skip then...
                list = @options?.previous?.data?.list
                if list
                    @selected = list
                    @enrichList()
            when 2
                # We better have the list set.
                assert @model.get('data'), 'List not provided'
                # We have a list!
                Mediator.publish 'context:new', [ 'iHaveList' ], @model.get('guid')

        # Have we selected an item in the listing of lists?
        @delegate 'click', 'input.check', @selectList

        # Use a "list" from step #1.
        @delegate 'click', '#submit', @enrichList

        @

    # Select a list, and only one list, in a table of lists.
    selectList: (e) =>
        # Deselect any already selected.
        $(@el).find('table input.check').prop('checked', false)
        # Set us as selected.
        @selected = @lists[$(e.target).attr('data-key')]
        # Actually tick us again.
        $(e.target).prop('checked', true)

    # Set list and render step 2 saving into history.
    enrichList: =>
        # Do we have a list selected?
        unless @selected
            Mediator.publish 'modal:render',
                'title': 'Oops &hellip;'
                'text': 'You have not selected any lists.'
        else
            # Set on model.
            @model.set 'data': { 'list': @selected }
            # Update the history.
            Mediator.publish 'history:add', @model
            # Change the step.
            Mediator.publish 'tool:step', @step += 1