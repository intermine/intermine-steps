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
                # Use Foundation forms.
                @getDOM().foundationCustomForms()

                # Be able to switch between the two input types.
                switcher = $ '.section-container'
                switcher.find('p.title a').click (e) ->
                    # Switch off the other tabs.
                    switcher.find('section.active').removeClass('active')
                    # Switch us on.
                    $(e.target).closest('section').addClass('active')

                # Capture submit clicks.
                @delegate 'click', '#submit', @idResolution

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

    # Upload a list of identifiers and make them into a list.
    idResolution: ->
        # Our ref.
        self = @

        # Input cleaner.
        clean = (value) ->
            value = value
            .replace(/^\s+|\s+$/g, '') # trim leading and ending whitespace
            .replace(/\s{2,}/g, ' ')   # remove multiple whitespace
            
            return [] if value is ''   # useless whitespace input

            value.split /\s/g          # split on whitespace

        # Expose the input here.
        input = {}

        # Get the DOM.
        dom = self.getDOM()

        # Say we are working.
        dom.append $ '<div/>', 'class': 'loading -steps-ui'

        # Get the form.
        async.waterfall [ (cb) ->
            # Get the identifiers.
            input.ids = clean dom.find('form textarea').val()

            # Do we have any?
            return cb 'No identifiers have been provided' if input.ids.length is 0

            # Get the DOM data.
            input.organism = dom.find('select[name="organism"]').val()
            input.type = dom.find('select[name="type"]').val()

            # Next.
            cb null

        # Upload IDs.
        (cb) ->
            (root.App.service.im.resolveIds
                'identifiers': input.ids
                'type':        input.type
                # 'extra':     input.organism
            ).then (job) ->
                cb null, job

        # Poll for job results.
        (job, cb) ->
            job.poll().then (results) ->
                # Just get the keys.
                keys = _.keys results

                # Do we have anything?
                return cb 'No identifiers were resolved' if keys.length is 0
        
               # Form a query.
                query =
                    'model':
                        'name': 'genomic'
                    'select': [
                        "#{input.type}.*"
                    ]
                    'constraints': [
                        { 'path': "#{input.type}.id", 'op': 'ONE OF', 'values': keys }
                    ]

                cb null, query

        # Turn a Query into a Query Object.
        (query, cb) ->
            root.App.service.im.query query, (q) ->
                cb null, q, query

        # Save as a list.
        (q, query, cb) ->
            # Generate a practically unique list name.
            name = root.Utils.guid()
            
            # Save as a list.
            q.saveAsList { 'name': name }, (l) ->
                # Save the input proper.
                self.model.set 'data',
                    'identifiers': input.ids
                    'organism':    input.organism
                    'type':        input.type
                    'query':       query
                    'list':        name

                # Update the history, we are set.
                Mediator.publish 'history:add', self.model

                # We are done.
                cb null

        ], (err) ->
            return console.log err if err

            # Next step, results.
            self.nextStep()