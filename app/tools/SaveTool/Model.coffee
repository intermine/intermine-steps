Tool = require 'chaplin/models/Tool'

module.exports = class SaveTool extends Tool

    defaults:
        'slug': 'save-tool'
        'name': 'SaveTool'
        'type': 'deyork'
        'steps': [ 'Choose input', 'Save data' ]