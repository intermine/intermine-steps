Tool = require 'chaplin/models/Tool'

module.exports = class BlastSearchTool extends Tool

    defaults:
        'slug': 'blast-search-tool'
        'name': 'BlastSearchTool'
        'title': 'BLAST Search'
        'description': 'Conduct a BLAST search'
        'type': 'kimberly'
        'steps': [ 'Input search item', 'See Result' ]