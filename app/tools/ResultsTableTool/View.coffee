Mediator = require 'chaplin/core/Mediator'
ToolView = require 'chaplin/views/Tool'

module.exports = class ResultsTableTool extends ToolView

    afterRender: ->
        super

        # Say we can export and we are a pass-thru entity.
        Mediator.publish 'context:i:canExport', @model.get('parent')