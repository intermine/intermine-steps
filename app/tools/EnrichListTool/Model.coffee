Tool = require 'chaplin/models/Tool'

module.exports = class EnrichListTool extends Tool

    defaults:
        'slug': 'enrich-list-tool'
        'name': 'EnrichListTool'
        'title': 'Enrich a List'
        'description': 'Show a list enrichment chart'
        'type': 'crail'
        'steps': [ 'Choose a list', 'See Chart' ]