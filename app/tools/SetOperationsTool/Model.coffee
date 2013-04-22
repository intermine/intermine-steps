Tool = require 'chaplin/models/Tool'

module.exports = class SetOperationsTool extends Tool

    defaults:
        'slug': 'set-operations-tool'
        'name': 'SetOperationsTool'
        'type': 'kimberly'
        'steps': [ 'Choose lists and operation', 'See result' ]