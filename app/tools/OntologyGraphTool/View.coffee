Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

root = @

module.exports = class OntologyGraphView extends ToolView

    getTemplateData: ->
        data = super

        switch @step
            when 1
                # As an extra param.
                if (extra = @options.extra) and extra instanceof Array and extra.length isnt 0
                    _.extend data, 'id': extra[0]
                # When looking at a history.
                if @model.get('locked')?
                    _.extend data, @model.get 'data'

        data

    attach: ->
        super

        switch @step
            when 1
                # Do we have object id already?
                if (extra = @options.extra) and extra instanceof Array and extra.length isnt 0
                    # Need to convert to a symbol on next step.
                    @id = parseInt extra[0]
                    return @nextStep()

                # Capture submit clicks.
                @delegate 'click', '#submit', =>
                    @id = parseInt $(@el).find('input[name="id"]').val()
                    @nextStep()

            when 2
                if _.isNumber(@id)
                    # Convert to a symbol.
                    root.App.service.im.query
                        'model':
                            'name': 'genomic'
                        'select': [
                            "Gene.symbol"
                        ]
                        'constraints': [
                            { 'path': "Gene.id", 'op': '=', 'value': @id }
                        ]
                    , (q) =>
                        q.rows (rows) =>
                            if rows and rows.length is 1 and (row = rows.pop()) and (symbol = row.pop())
                                return @save 'symbol': symbol
                            
                            Mediator.publish 'modal:render',
                                'title': 'Oops &hellip;'
                                'text': 'Gene id not resolved.'

                else
                    # Assume is a symbol.
                    @save 'symbol': @id

            when 3
                root.App.service.report.load "ontology-graph", "#ontology",
                    service:
                        root: "http://www.flymine.org/query"

                    interop: [
                        taxonId: 4932
                        root: "yeastmine-test.yeastgenome.org/yeastmine-dev"
                        name: "SGD"
                    ,
                        taxonId: 10090
                        root: "http://beta.mousemine.org/mousemine"
                        name: "MGI"
                    ,
                        taxonId: 6239
                        root: "http://intermine.modencode.org/release-32"
                        name: "modMine"
                    ]

                    graphState:
                        query: @model.get('data').symbol

        @

    save: (obj) ->
        # Save the input proper.
        @model.set 'data', obj

        # Update the history, we are set.
        Mediator.publish 'history:add', @model

        # Next step.
        @nextStep()