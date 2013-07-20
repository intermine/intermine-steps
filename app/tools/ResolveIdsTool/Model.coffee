Tool = require 'chaplin/models/Tool'

module.exports = class ResolveIdsTool extends Tool

    defaults:
        'slug': 'resolve-ids-tool'
        'name': 'ResolveIdsTool'
        'title': 'Resolve identifiers to a List'
        'description': 'Upload a list of identifiers'
        'type': 'deyork'