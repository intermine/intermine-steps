Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

App = @App

# Fetch these from a mine instead.
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

    getTemplateData: ->
        switch @step
            when 1
                # Pass on the types & organisms that can be used.
                _.extend super,
                    'types': types
                    'organisms': organisms
            else
                super

    attach: ->
        super

        switch @step
            # Get the identifiers from a form.
            when 1
                # Custom foundation forms.
                $(@el).foundationCustomForms()

                # Capture submit clicks.
                @delegate 'click', '#submit', =>
                    # Get the identifiers.
                    ids = @clean @getDOM().find('form textarea').val()

                    # Do we have any?
                    if ids.length is 0
                        return Mediator.publish 'modal:render',
                            'title': 'Oops &hellip;'
                            'text': 'No identifiers have been provided.'

                    # Set the DOM data on the Model.
                    @model.set 'data',
                        'identifiers': ids
                        'organism':    @getDOM().find('select[name="organism"]').val()
                        'type':        @getDOM().find('select[name="type"]').val()

                    # Update the history, we are set.
                    Mediator.publish 'history:add', @model
                    # Change the step.
                    Mediator.publish 'tool:step', @step += 1

            # Upload identifiers, loading stage...
            when 2
                # Grab the data.
                { identifiers, type } = @model.get 'data'

                # Resolve IDs.
                (App.service.resolveIds
                    'identifiers': identifiers
                    'type':        type
                ).then (job) =>
                    job.poll().then (@results) =>
                        # Change the step.
                        setTimeout =>
                            Mediator.publish 'tool:step', @step += 1
                        , 500
            
            # We have resolved the identifiers.
            when 3
                return console.log @results

                # We have a list!
                Mediator.publish 'context:new', [ 'have:list' ], @model.get('guid')

        @

    # Cleanup textarea input.
    clean: (value) ->
        value = value
        .replace(/^\s+|\s+$/g, '') # trim leading and ending whitespace
        .replace(/\s{2,}/g, ' ')   # remove multiple whitespace
        
        return [] if value is ''   # useless whitespace input

        value.split /\s/g          # split on whitespace