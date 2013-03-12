Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

module.exports = class ResultsTableTool extends ToolView

    attach: ->
        super

        # Say we can export and we are a pass-thru entity.
        Mediator.publish 'context:new', [ 'iHaveList' ], @model.get('parent')