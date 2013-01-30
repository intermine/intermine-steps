Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class ResultsTableTool extends ToolView

    # Extend by the model passed in.
    getTemplateData: ->
        data = super

        # We better have parent.
        assert previous = @options.previous, "No previous Model provided"

        _.extend data, 'previous': previous.data