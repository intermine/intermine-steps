Tool = require 'chaplin/models/Tool'

module.exports = class ResultsTableTool extends Tool

    defaults:
        'slug': 'results-table-tool'
        'name': 'ResultsTableTool'
        'title': 'Results Table'
        'description': 'Show a table of results'
        'type': 'curiousblue'
        'steps': [ 'See Table' ]