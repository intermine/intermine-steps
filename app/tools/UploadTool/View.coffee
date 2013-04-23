Mediator   = require 'chaplin/core/Mediator'
ToolView   = require 'chaplin/views/Tool'
{ config } = require 'tools/config'

# Fetch these from a mine instead.
types = [ 'Genes', 'Proteins' ]
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
                @delegate 'click', '#submit', ->
                    # Get the DOM data.
                    @model.set 'data',
                        'identifiers': @getDOM().find('form textarea').val().split(' ')

                    # Update the history.
                    Mediator.publish 'history:add', @model
                    # Change the step.
                    Mediator.publish 'tool:step', @step += 1

            # Upload identifiers, loading stage...
            when 2
                1+1
            
            # We have resolved the identifiers.
            when 3
                # We have a list!
                Mediator.publish 'context:new', [ 'have:list' ], @model.get('guid')

        @