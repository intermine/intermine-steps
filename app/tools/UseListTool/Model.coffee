Tool = require 'chaplin/models/Tool'

module.exports = class UseListTool extends Tool

    defaults:
        'slug': 'use-list-tool'
        'name': 'UseListTool'
        'title': 'Use a List'
        'description': 'Upload a list of identifiers or use an existing list'
        'type': 'deyork'