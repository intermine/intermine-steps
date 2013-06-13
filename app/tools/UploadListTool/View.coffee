Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

# Should be fetched from the mine instead.
types = [ 'Gene', 'Protein' ]
organisms = [
    'Caenorhabditis elegans'
    'Danio rerio'
    'Drosophila melanogaster'
    'Homo sapiens'
    'Mus musculus'
    'Rattus norvegicus'
    'Saccharomyces cerevisiae'
]

module.exports = class UploadListToolView extends ToolView

    # Switch template based on the step we are on.
    getTemplateData: ->
        switch @step
            # Pass on the types & organisms that can be used to the edit form.
            when 1
                _.extend super,
                    'types': types
                    'organisms': organisms
            # Just give us the default.
            else
                super

    attach: ->
        super

        switch @step
            # Get the identifiers from a form.
            when 1
                # Use Foundation3 forms.
                @getDOM().foundationCustomForms()

                # Capture submit clicks.
                @delegate 'click', '#submit', =>
                    # Get the identifiers.
                    @ids = @clean @getDOM().find('form textarea').val()

                    # Do we have any?
                    if @ids.length is 0
                        return console.log
                            'title': 'Oops &hellip;'
                            'text': 'No identifiers have been provided.'

                    # Get the DOM data.
                    @organism = @getDOM().find('select[name="organism"]').val()
                    @type = @getDOM().find('select[name="type"]').val()

                    # Change the step.
                    @nextStep()

            # Upload identifiers & save as a Model.
            when 2
                # Resolve IDs.
                (root.App.service.im.resolveIds
                    'identifiers': @ids
                    'type':        @type
                    # 'extra':       @organism
                ).then (job) =>
                    job.poll().then (results) =>
                        keys = _.keys results

                        # Do we have anything?
                        if keys.length is 0
                            return $(@el).find('.target').append $('<p/>', { 'text': 'No identifiers were resolved.' })

                        # Form a query.
                        @query =
                            'model':
                                'name': 'genomic'
                            'select': [
                                "#{@type}.*"
                            ]
                            'constraints': [
                                { 'path': "#{@type}.id", 'op': 'ONE OF', 'values': keys }
                            ]

                        @nextStep()
            
            # Convert identifiers into a list too.
            when 3
                # Turn a Query into a Query Object.
                root.App.service.im.query @query, (q) =>
                    # Generate a practically unique list name.
                    name = root.Utils.guid()
                    # Save as a list.
                    q.saveAsList {'name': name}, (l) =>
                        # Save the input proper.
                        @model.set 'data',
                            'identifiers': @ids
                            'organism':    @organism
                            'type':        @type
                            'query':       @query
                            'list':        name

                        # Update the history, we are set.
                        Mediator.publish 'history:add', @model

                        # Next step.
                        @nextStep()

            # We have resolved the identifiers & have a list reference.
            when 4
                # Expand on us.
                { type, list } = @model.get('data')

                # Where to?
                target = $(@el).find('.im-table')

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
                target.imWidget
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

    # Cleanup textarea input.
    clean: (value) ->
        value = value
        .replace(/^\s+|\s+$/g, '') # trim leading and ending whitespace
        .replace(/\s{2,}/g, ' ')   # remove multiple whitespace
        
        return [] if value is ''   # useless whitespace input

        value.split /\s/g          # split on whitespace