Tool = require 'chaplin/models/Tool'

module.exports = class QueryBuilderTool extends Tool

    defaults:
        'slug': 'query-builder-tool'
        'name': 'QueryBuilderTool'
        'type': 'deyork'
        'steps': [ 'Build query', 'See query' ]