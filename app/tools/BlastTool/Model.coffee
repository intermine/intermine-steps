Tool = require 'chaplin/models/Tool'

module.exports = class BlastTool extends Tool

    defaults:
        'slug': 'blast-tool'
        'name': 'BlastTool'
        'title': 'BLAST Search'
        'description': 'Conduct a BLAST search'
        'type': 'terracotta'
        'steps': [ 'Input search query', 'See Result' ]