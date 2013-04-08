Tool = require 'chaplin/models/Tool'

module.exports = class SearchTool extends Tool

    defaults:
        'slug': 'search-tool'
        'name': 'SearchTool'
        'type': 'deyork'
        'steps': [ 'Input query', 'See result' ]