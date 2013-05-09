Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

App = @App

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
                # Custom foundation forms.
                $(@el).foundationCustomForms()

                # Capture submit clicks.
                @delegate 'click', '#submit', =>
                    # Get the identifiers.
                    @ids = @clean @getDOM().find('form textarea').val()

                    # Do we have any?
                    if @ids.length is 0
                        return Mediator.publish 'modal:render',
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
                (App.service.resolveIds
                    'identifiers': @ids
                    'type':        @type
                ).then (job) =>
                    job.poll().then (results) =>
                        # Save the input proper.
                        @model.set 'data',
                            'identifiers': @ids
                            'organism':    @organism
                            'type':        @type
                            'results':     results

                        # Change the step.
                        setTimeout =>
                            # Update the history, we are set.
                            Mediator.publish 'history:add', @model
                            # Next step.
                            @nextStep()
                        , 500
            
            # We have resolved the identifiers.
            when 3
                console.log @model.toJSON()

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